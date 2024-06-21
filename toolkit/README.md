- [Check CLI Output](#check-cli-output)
  - [Usage](#usage)

# Check CLI Output

The check_cli_output.py script will run `spin --help` for all subcommands recursively. This is useful for quickly detecting changes in the Spin CLI's output between different versions (i.e. when updating the Spin CLI Reference page in the documentation during each release).

## Usage

We:
- create a variable for each version
- create two new directories
- copy the script into each directory (this makes the script's output identical - aside from actual changes)
- install the specific version of Spin in each directory
- run the script using that specific version
- diff the results

```bash
cd ~
export SPIN_LATEST=v2.6.0
export SPIN_OLD=v2.5.0
mkdir $SPIN_OLD
mkdir $SPIN_LATEST
cp -rp check_cli_output.py $SPIN_OLD
cp -rp check_cli_output.py $SPIN_LATEST
cd ~
cd $SPIN_OLD
curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash -s -- -v $SPIN_OLD
python3 check_cli_output.py > $SPIN_OLD
cd ../ 
cd $SPIN_LATEST
curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash -s -- -v $SPIN_LATEST
python3 check_cli_output.py > $SPIN_LATEST
cd ../
diff $SPIN_OLD/$SPIN_OLD $SPIN_LATEST/$SPIN_LATEST
```

The output will show old content on the `<` prefixed lines and new content on the `>` prefixed lines. If there have been no changes to the CLI (other than the version and checksum) you will see something similar to the following:

```bash
< Output: spin 2.5.0 (83eb68d 2024-05-08)

> Output: spin 2.6.0 (a4ddd39 2024-06-20)
```

To clean up, run the following:

```bash
rm -rf $SPIN_OLD
rm -rf $SPIN_LATEST
```
