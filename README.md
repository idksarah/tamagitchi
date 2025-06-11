# overview
![logo](./graphics/tamagitchi.jpg)
tamagitchi is a cute Github README add-on to allow you to stand out from other users. Visitors can watch your activity by watching your tamagitchi and you can also promote your own repositories! idk bru

# usage (under construction!)
### fork this repository
### if you don't already have one, create a profile repository-- a repository named your username. eg, your_user creates a repo named your_user. idksarah creates a repo called idksarah. this will host your special README.md
### create a fine grained access token.
- go to user settings
- go to developer settings
- click on the personal access tokens drop down. Click on fine-grained tokens
- generate new token. You'll have to authenticate for this, either with 2FA or your password
- assign a token name. Doesn't matter for this purpose. Just something you'll remember.
- i set my token to not expire, but that's like. Probably bad practice. Up to you! lol
- **grant repository access**: Grant access to all repositories.
- **grant permissions**: for user permissions, grant *read access to followers and user events*; for repository permissions, grant *read access to metadata* and *read and write access to code*. 
- **save your token. somewhere**
### grant token access to your forked version of tamagitchi
- go to your forked tamagitchi
- go to settings
- click on the secrets and variables dropdown. go to actions
- add a new *repository secret*. name it **FPGA_TOKEN** and add your secret.
### grant token access to your profile repository.  
- repeat the earlier steps.
### edit your forked version of tamagitchi
- open up tamagitchi in your preferred IDE.
- #### edit index.mjs
- open src/
- open index.mjs
- edit any section prefaced by *!!* otherwise. dont. edit!
- in index.mjs, you'll have to add your username, the repo you would like to display on your profile (for other people to star), and any content you would like to see above the tamagitchi
- #### edit update.yml
- open .github/workflows/update.yml
- edit any section prefaced by *!!* otherwise. dont. edit!
- in update.yml, you'll have to replace the repository line with your username (eg your_user/your_user)
### (optional) Enable autoplay (on your personal system)
head to (https://github.com/settings/accessibility) and enable autoplay!

# examples
 ![tamagitchi](./graphics/emotions/excited.gif) <br>
    tamagitchi is feeling excited! pet them to make idksarah happy! (⭐ [star idksarah's tamagitchi!!](https://github.com/idksarah/tamagitchi))