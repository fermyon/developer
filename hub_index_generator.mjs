import glob from 'glob'
import fs from 'fs'
import fm from 'front-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import args from 'args-parser'

// Elements that have child elements
const blockElements = ["paragraph", "blockquote", "list", "listItem", "link"]
// Elements who's value is just text
const inlineElements = ["inlineCode", "text", "code"]

function parseMdFile(file, filepath) {
    let data = fs.readFileSync(file,
        { encoding: 'utf8', flag: 'r' });
    let fmIndex = data.indexOf("---")

    // Make the extra section parsable as frontmatter
    if (data.slice(0, fmIndex).includes("[extra]")) {
        data = data.replace("[extra]", "extra_Section: \"OK\"")
        fmIndex += 12
    }

    // Make it valid frontmatter as per jekyll standards
    let fmReplace = data.slice(0, fmIndex)
    fmReplace = fmReplace.replaceAll("=", ":")
    data = fmReplace + data.slice(fmIndex, -1)
    data = "---\n\n" + data

    // Parse markdown into json tree
    let content = fm(data)

    if (content.attributes.type != "hub_document") {return}

    let myResult = unified()
        .use(remarkParse)
        .parse(content.body);

    // Create default document index for the page
    let documentIndex = {
        title: content.attributes["title"],
        author: content.attributes["author"],
        content: "",
        keywords: content.attributes["keywords"],
        langauge: content.attributes["language"],
        tags: content.attributes["tags"],
        url: "/hub/preview/" + file.replace(filepath, "").replace(".md", ""),
        id: file.replace(filepath, "").replace(".md", "")
    }

    // For each heading create a new search index
    myResult.children.map(k => {
        if (!(k.type == "heading")) {
            // If inline element just append content
            if (inlineElements.includes(k.type)) {
                documentIndex.content = documentIndex.content.concat(k.value)
            }
            else {
                if (blockElements.includes(k.type)) {
                    k.children.map(inlineElement => {
                        documentIndex.content = documentIndex.content.concat(inlineElement.value)
                    })
                }
            }
        }
    })
    return documentIndex
}

function main() {
    const argparse = args(process.argv)
    if (!argparse.dir || !argparse.out) {
        console.error("--dir and --out must be specified")
        return
    }

    let consolidatedSearchIndex = []

    glob(argparse.dir + '/**/*.md', { ignore: argparse.ignore }, (err, files) => {
        if (err) {
            console.log('Error', err)
        } else {
            files.forEach(file => {
                let ret = parseMdFile(file, argparse.dir)
                if (ret) {
                    consolidatedSearchIndex = consolidatedSearchIndex.concat(ret)
                }
            })
        }
        fs.writeFileSync(argparse.out, JSON.stringify(consolidatedSearchIndex));
    })
}

main()