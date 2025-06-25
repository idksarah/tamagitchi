<h1>overview</h1>
<p>
    tamagitchi is a cute github readme add-on to help you stand out. visitors can watch your activity through your tamagitchi, and you can also promote your own repositories.
</p>
<br>
<img style="width: 50em;"src="./graphics/emotions/happy.gif" alt="tamagitchi">
<hr>

<h1>example profiles</h1>
<ul>
    <li><a href="https://github.com/idksarah" target="_blank">https://github.com/idksarah</a></li>
    <li><a href="https://github.com/rkdune" target="_blank">https://github.com/rkdune</a></li>
</ul>
<h1>how it works</h1>
<p>
    tamagitchi checks a designated repo and compares its star count with the star count in <code>src/stats.json</code>. if the star count is higher, tamagitchi updates <code>stats.json</code> and writes to your profile <code>README.md</code>.<br><br>
    similarly, for other emotions (<i>sad</i>, <i>neutral</i>, <i>happy</i>), tamagitchi checks your recent activity and updates your <code>README.md</code> accordingly.
</p>
<h1>usage</h1>

<h2>1. fork this repository</h2>

<h2>2. create a profile repository (if you don't have one)</h2>
<p>
    this is a special repo named exactly your username.<br>
    for example:<br>
    - <code>your_user</code> → repo called <code>your_user</code><br>
    - <code>idksarah</code> → repo called <code>idksarah</code><br>
    this will host your special <code>README.md</code>.
</p>

<h2>3. create a fine-grained access token</h2>
<ol>
    <li>go to <b>user settings</b></li>
    <li>go to <b>developer settings</b></li>
    <li>open <b>personal access tokens → fine-grained tokens</b></li>
    <li>click <b>generate new token</b></li>
    <li>authenticate (via 2fa or password)</li>
    <li>give it any name</li>
    <li>don't expire</li>
</ol>
<p><b>token permissions:</b></p>
<ul>
    <li><b>repository access:</b> all repositories</li>
    <li><b>repository permissions:</b>
        <ul>
            <li>metadata: read-only</li>
            <li>content: read and write</li>
        </ul>
    </li>
    <li><b>user permissions:</b>
        <ul>
            <li>user events: read-only</li>
        </ul>
    </li>
</ul>
<p>→ save your token somewhere. like. actually save it. </p>

<h2>4. add the token to your forked tamagitchi repo</h2>
<ol>
    <li>go to <b>settings</b> in your fork</li>
    <li>open <b>secrets and variables → actions</b></li>
    <li>click <b>new repository secret</b></li>
    <li>name it <code>FGPA_TOKEN</code></li>
    <li>paste your token</li>
</ol>

<h2>5. add the token to your profile repository</h2>
<p>repeat the same steps as above.</p>

<h2>6. edit your forked tamagitchi</h2>

<h3>edit <code>index.mjs</code></h3>
<ul>
    <li>open <code>src/index.mjs</code></li>
    <li>edit anything marked with <code>!!</code> — don't touch anything else</li>
    <li>you'll need to add:
        <ul>
            <li>your github username</li>
            <li>the repository you want to promote (for people to star)</li>
            <li>any other text you'd like to appear in your profile </li>
        </ul>
    </li>
</ul>

<h3>edit <code>update.yml</code></h3>
<ul>
    <li>open <code>.github/workflows/update.yml</code></li>
    <li>edit anything marked with <code>!!</code> only</li>
    <li>change the repository line to match your username:
        <pre><code>repository: your_user/your_user</code></pre>
    </li>
</ul>

<h2>7. test it </h2>
<ul>
    <li>go to <b>actions</b> in your forked tamagitchi</li>
    <li>click <b>Update</b></li>
    <li>run workflow on branch <b>main</b></li>
    <li>wait ~15 seconds. check your profile. you should have your very own tamagitchi. it'll update once an hour.</li>
</ul>

<h2>8. (optional) enable autoplay</h2>
<ul>
    <li>go to <a href="https://github.com/settings/accessibility" target="_blank">github accessibility settings</a></li>
    <li>enable autoplay</li>
    <li>disclaimer: this only enables autoplay on your own system</li>
</ul>
<hr>
<h1>interested in designing your own tamagitchi?</h1>
<p>
    the base art files are located in <code>template/</code>. feel free to fork this repo and create your own designs.<br>
    actual implementation requires hosting the designs on a cdn and replacing the file links in <code>src/tamagitchi.mjs</code>.<br>
    dm me if you have any questions.
</p>
<hr>
<p>made with &lt;3 by <a href="https://github.com/idksarah" target="_blank">idksarah</a></p>