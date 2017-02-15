KNAB Style Library
--

## Packages

Since we're going to use the cx-shared-library we will need to include
the packages from that project so we need to follow the instructions 
to include the packages from them.

## Accessing

To access any private npm registry you need to define it.
It can be done by changing your global npm settings with:
npm config set @cx:registry https://swfactory.aegon.com/artifactory/api/npm/npm
or by having .npmrc file in your project defining that registry with the following line:
@cx:registry=https://swfactory.aegon.com/artifactory/api/npm/npm
Now you should be able to run successfully npm install @cx/[package] or npm show @cx/[package]/ Packages names are defined for every packages in their own package.json files.


