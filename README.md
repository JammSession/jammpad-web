# jammpad-web
<div style="text-align:center"><img src="https://pbs.twimg.com/profile_banners/1289939513876393985/1596381222/1500x500" /></div>

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).


## Codebase

### components
Components are grouped as Atoms, Molecules and Organisms:
- Atoms: Very small components, are reused often
- Molecules: Consists out of Atoms and have more logic
- Organisms: Compolexer components, consisting out of multiple other components

### pages
The page folder structure creates routes automatically, thanks to Nuxt. But this means that we need to stick to the opinionated folder structure.

### services
Here are the API services and web3 API for Ethereum. For now it is:
- EthereumService: All things web3.
- OutpostService: API for Outpost, the protocol that serves content.
- SnapshotService: API for SNapshot, the protocol for governance.
- TokenService: Coingecko API for JAMM price, Gnosis Safe link to Treasury, and Etherscan API to get Treasury $JAMM balance

### store
This is the Vuex store, which works similar to Redux. The Action `nuxtClientInit` is called when a user opens the page. If you want to load data at startup, it should be called there.

### assets/data
Most important static data like constants, keys, mocked data, and all ABIs and Contracts are in here. I like to keep constant data in this folder to make it easy to maintain.

### plugins
No need to worry much about this folder. It's used for Nuxt to inject certain methods into Vue instances. For example, util.ts injects $util, so that you can call it by this.$util inside Vue components. 