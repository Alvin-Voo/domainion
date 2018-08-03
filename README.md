## Domainion

The world domaination has begun!

### What is this about?

Sorry, can't tell you yet.

### What to do?

To run
```
> git clone https://github.com/Alvin-Voo/domainion.git
> cd domainion
> yarn install
> npm start
```
To build
dev copy:
```
> npm run build
```
prod copy:
```
> npm run build_prod
```
To load the Chrome extension
1. Open your Chrome browser
2. Enter 'chrome://extensions' in the address bar
3. Toggle the 'Developer mode'
4. Click 'Load Unpacked'
5. Ensure that the files has been built by webpack
6. Load the 'build' folder
7. Refresh the browser

8. Alternatively, you could unzip build.prod.\***\.zip that I provided under extension/ and load that.

### TODO:

1. players.sol - getMyDomains() and getMyInfo() change to with address argument better for testing? Safety concern?
2. redux-persist - to rehydrate popup state once browser restarts
3. better (idea) for handling of state when switching between tabs
3. 'Join' button switch to a 'start screen' before actual content
4. Need to better handle the screen transition in state. e.g fade in out delay before refresh page?
