<div align="center">
<a align="center" href="https://spotify-react-web-client.onrender.com/" target="_blank" >
  <p align="center">
    <img src="https://github.com/user-attachments/assets/726763a6-094a-42cf-878c-1e7d47a2e597" style="height: 250px"/>
  </p>
</a>
</div>

<p align="center">

<img src="https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white" alt="Spotify Badge">
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React Badge">
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript Badge">
<img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Badge">

</p>

# 🎧 Spotify React Web Client

## Music import login demo

A welcome screen for listeners switching to Spotify: choose **Import your music**, select your current service, then continue to TuneMyMusic. The welcome screen and provider picker run without an API key or a Spotify account.

### Run the demo

Use **Node.js 24 LTS** (or Node 22.12+). With `nvm`, run `nvm install 24` and `nvm use 24` first.

```bash
cd /Users/william/spotify-react-web-client
npm install --legacy-peer-deps --package-lock=false
npm run dev
```

The compatibility flag is needed because this repository's `react-player-controls` package declares older React peer dependencies. The existing Yarn lockfile remains the repository's lockfile; alternatively, use `yarn install --frozen-lockfile` with Yarn Classic.

Open **http://127.0.0.1:3000/demo**. This URL always shows the welcome experience, even if you previously logged in. Signed-out visitors also see it at `/`.

### Walk through it

1. Click **Import your music** on the login screen.
2. Choose **Apple Music**, **YouTube Music**, **Amazon Music**, or **Another service**.
3. Click **Continue with TuneMyMusic**. A new tab opens the corresponding transfer page (or the service chooser for another provider).
4. On TuneMyMusic, connect your source account, choose your music, connect Spotify as the destination, and confirm the transfer. If you are new to Spotify, use **Create a free account first** in the dialog.

The local demo demonstrates discovery, provider selection, and the real external handoff. Actual transfers and account permissions happen on TuneMyMusic; this app does not simulate a completed import or receive transfer status. Service limits, matching results, and any fees are shown by TuneMyMusic. The original playlists remain on the source service.

**Login:** without `.env` credentials, **Log in to Spotify** opens Spotify's official login page; it does not authenticate this local client. To use the existing player, follow the Spotify developer setup below, restart the server, and open `/`. Configured login uses the project's existing OAuth flow.

**Verify a production build:**

```bash
npm run build
npm run preview
```

Then open **http://127.0.0.1:3000/demo**. Stop either server with **Ctrl+C**.

Reference: [Spotify's playlist-import support](https://support.spotify.com/us/article/importing-your-playlists-to-spotify/) and [TuneMyMusic](https://www.tunemymusic.com/).

> [!IMPORTANT]
> Spotify Playback requires users to authenticate with a valid Spotify Premium subscription.

![gif](https://github.com/user-attachments/assets/2077cdef-f3fa-49c9-a905-9cc9ab6629fb)

## 🚀 Features

⚡ **Music Playback**: Play songs in real-time using the Spotify Playback SDK.

⚡ **Playback Controls**: Play, pause, next, previous, shuffle, and repeat functionalities.

⚡ **Music Browsing**: Search and explore songs, artists, albums, and playlists.

⚡ **Playlists Management**: Create, edit, and delete personalized playlists.

⚡ **Saved Playlists and Albums Access**: View and play your saved playlists and albums.

⚡ **Liked Songs**: Mark tracks as "liked" and access a dedicated playlist for liked songs.

⚡ **Playback Devices**: Switch between different playback devices (desktop, mobile, smart speakers).

⚡ **Follow/Unfollow Artists**: Follow and unfollow artists to get updates on their new releases.

⚡ **Artist and Album Pages**: Dedicated pages for artists and albums, showcasing top songs, discography, and related artists.

## 🛠 Technologies Used

🎵 React: For building the user interface with reusable components.

🎵 React Redux: For global state management and smooth data flow across the app.

🎵 Vite: For the development server and production builds.

🎵 <a href="https://developer.spotify.com/documentation/web-api/">Spotify Web API</a>: To fetch data like playlists, albums, and user information.

🎵 <a href="https://developer.spotify.com/documentation/web-playback-sdk/">Spotify Playback SDK</a>: For real-time music playback control within the web client.

## 📸 Screenshots

More in images [folder](https://github.com/francoborrelli/spotify-react-web-client/tree/main/images).

<div align="center">
    <table >
     <tr>
       <td>
         <img src="images/Home.png" alt="Home"/>
         <img src="images/CurrentDevices.png" alt="Current devices"/>
       </td>
        <td>
         <img src="images/NewPlaylist.png" alt="New playlist"/>
          <img src="images/browse.png" alt="Browse"/>
       </td>
                 <td>
         <img src="images/Profile.png" alt="Profile"/>
          <img src="images/playlist.png" alt="Playlist"/>
       </td>
     </tr>
    </table>
    </div>

## ⚙️ Installation & Setup

To run this project locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/francoborrelli/spotify-react-web-client.git
   ```

2. Navigate to the project directory:

   ```bash
   cd spotify-react-web-client
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Set up your Spotify Developer account and create a [new app](https://developer.spotify.com/dashboard/applications) to obtain your **Client ID** and **Redirect URI**. Add the redirect URI `http://127.0.0.1:3000` in the Spotify Dashboard, then copy `.env.dist` to `.env` and fill in your values:

   ```bash
   cp .env.dist .env
   ```

   ```
   VITE_SPOTIFY_CLIENT_ID=<your id>
   VITE_SPOTIFY_REDIRECT_URL=http://127.0.0.1:3000
   ```

   > Vite only exposes env vars prefixed with `VITE_`. The redirect URL must match the Dashboard entry exactly.

5. Start the development server:

   ```bash
   yarn start
   ```

6. Open your browser and navigate to `http://127.0.0.1:3000`.

## 🌐 2018 Version

There is also a 2018 version of this Spotify clone, which features the Spotify UI from that year. You can find the code for that version in the [`main-2018`](https://github.com/francoborrelli/spotify-react-web-client/tree/main-2018) branch.

- **2018 version branch**: [main-2018](https://github.com/francoborrelli/spotify-react-web-client/tree/main-2018)
- **2018 live demo**: [Check out the app](https://spotify-react-web-client-2018.onrender.com/)

Feel free to explore the older version and compare the features and functionality between the two versions.

## 🤝 Contributions

Contributions are welcome! If you have any suggestions or improvements, feel free to fork the repository, create a new branch, and submit a pull request.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
