#!/bin/bash
#
# This file is part of YourDLT shared under Apache-2.0
# Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
#
# @package     YourDLT
# @author      Gregory Saive for Using Blockchain Ltd <greg@ubc.digital>
# @license     Apache-2.0
#
if [ $# -lt 1 ]; then
  echo "Usage: sh bin/install.sh <INSTALL_PATH>"
  echo " e.g.: sh bin/install.sh /opt/my-blockchain-data"
  exit 1
fi

INSTALL_PATH=$1

if [ ! -f $INSTALL_PATH ]; then
  echo "Install path does not exist."
  exit 2
fi

cd ${INSTALL_PATH}
curl -fsSL https://yourdlt.tools/files/yourdlt-1.0.0.tgz -o yourdlt-1.0.0.tgz
tar xvzf yourdlt-1.0.0.tgz
mv package yourdlt && rm -f yourdlt-1.0.0.tgz
cd yourdlt && npm i
ln -s bin/run yourdlt
alias yourdlt='$INSTALL_PATH/yourdlt/yourdlt'
echo "@# YourDLT@alias yourdlt='$INSTALL_PATH/yourdlt/yourdlt'" | sed -e's/@/\n/g' >> ~/.bashrc
source ~/.bashrc
cd -

# Check install
yourdlt -v