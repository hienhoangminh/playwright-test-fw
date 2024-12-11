**How you can run the test?**

1. Configuration:
- First, please ensure that you have:
  +) Node is installed:
     [] Check if node -v can return Node version.
     [] Check if npm -v can return Node version.

- Next, clone the repo
- Then, please run the command : npm i

2. Execution:
- Currently we support 4 tags:
     [] regression : corresponded to regression test, which will trigger all tests having tag @regression
     [] login : corresponded to login test, which will trigger all tests having tag @login
     [] contactUs : corresponded to contact us test, which will trigger all tests having tag @contact-us
     [] smoke : corresponded to smoke test, which will trigger all tests having tag @smoke
- To execute the test with 4 supported tags, please execute: npm run cucumber [...]
- To run specific tags:
     [] add new tag in index.ts file

3. Reports:
- After running the test, you will see the HTML report at reports/ folder  
