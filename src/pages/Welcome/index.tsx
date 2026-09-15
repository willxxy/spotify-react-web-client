import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { FaAmazon, FaSpotify } from 'react-icons/fa';
import { SiApplemusic, SiYoutubemusic } from 'react-icons/si';
import { FiArrowRight, FiCheck, FiChevronDown, FiExternalLink, FiHeadphones, FiMoreHorizontal, FiMusic } from 'react-icons/fi';
import { loginToSpotify } from '../../store/slices/auth';
import { useAppDispatch } from '../../store/store';
import './welcome.scss';

const providers = [
  { id: 'apple', name: 'Apple Music', icon: SiApplemusic, url: 'https://www.tunemymusic.com/transfer/apple-music-to-spotify' },
  { id: 'youtube', name: 'YouTube Music', icon: SiYoutubemusic, url: 'https://www.tunemymusic.com/transfer/youtube-music-to-spotify' },
  { id: 'amazon', name: 'Amazon Music', icon: FaAmazon, url: 'https://www.tunemymusic.com/transfer/amazon-music-to-spotify' },
  { id: 'other', name: 'Another service', icon: FiMoreHorizontal, url: 'https://www.tunemymusic.com/' },
] as const;

const signupUrl = 'https://www.spotify.com/signup/';
const spotifyConfigured = Boolean(import.meta.env.VITE_SPOTIFY_CLIENT_ID?.trim() && import.meta.env.VITE_SPOTIFY_REDIRECT_URL?.trim());

function ImportMusicDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState<string>();
  const provider = providers.find((item) => item.id === selected);

  useEffect(() => {
    if (!open) setSelected(undefined);
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={520}
      className='music-import-modal'
      title={<span className='import-modal-eyebrow'><FiMusic aria-hidden='true' /> A fresh start. With your favorites.</span>}
    >
      <div className='import-dialog'>
        <h2>Where’s your music?</h2>
        <p className='import-dialog-intro'>Choose the service you’re coming from. We’ll help you bring your playlists to Spotify.</p>

        <fieldset className='import-providers'>
          <legend className='welcome-sr-only'>Choose your current music service</legend>
          {providers.map(({ id, name, icon: Icon }) => (
            <label className={`import-provider${selected === id ? ' is-selected' : ''}`} key={id}>
              <input type='radio' name='music-provider' value={id} checked={selected === id} onChange={() => setSelected(id)} />
              <span className={`provider-icon provider-icon--${id}`}><Icon aria-hidden='true' /></span>
              <span>{name}</span>
              <span className='provider-radio' aria-hidden='true'>{selected === id && <FiCheck />}</span>
            </label>
          ))}
        </fieldset>

        <div className='import-next'>
          <span className='import-next-icon'><FaSpotify aria-hidden='true' /></span>
          <div><strong>Your music’s next stop: Spotify</strong><p>On TuneMyMusic, connect your accounts, choose your playlists, and confirm your transfer.</p></div>
        </div>

        {provider ? (
          <a className='welcome-button welcome-button--green import-continue' href={provider.url} target='_blank' rel='noopener noreferrer'>Continue with TuneMyMusic <FiExternalLink aria-hidden='true' /></a>
        ) : (
          <button className='welcome-button welcome-button--green import-continue' disabled>Choose a service to continue <FiArrowRight aria-hidden='true' /></button>
        )}
        <p className='import-external-note'>Opens TuneMyMusic in a new tab. You’ll review the transfer there.</p>
        <p className='import-signup'>New to Spotify? <a href={signupUrl} target='_blank' rel='noopener noreferrer'>Create a free account first <FiExternalLink aria-label='opens in a new tab' /></a></p>
      </div>
    </Modal>
  );
}

function PlaylistArtwork() {
  return (
    <div className='welcome-artwork' aria-hidden='true'>
      <div className='art-orbit art-orbit--one' />
      <div className='art-orbit art-orbit--two' />
      <div className='playlist-cover playlist-cover--pink'><span>THE<br />GOOD<br />STUFF.</span><FiMusic /></div>
      <div className='vinyl-record'><div className='vinyl-label'><FaSpotify /></div></div>
      <div className='playlist-cover playlist-cover--green'>
        <div className='cover-topline'><FaSpotify /><span>MADE OF YOUR FAVORITES</span></div>
        <span className='cover-title'>On<br />repeat.</span>
        <div className='cover-waves'><i /><i /><i /><i /><i /></div>
        <span className='cover-bottomline'>SAME YOU. NEW POSSIBILITIES.</span>
      </div>
      <div className='art-floating-note'><span><FiCheck /></span>Your favorites are coming with you.</div>
    </div>
  );
}

export default function Welcome() {
  const dispatch = useAppDispatch();
  const [importOpen, setImportOpen] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(() => new URLSearchParams(window.location.search).has('error') ? 'Login wasn’t completed. You can try again when you’re ready.' : '');

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Your music comes with you · Spotify';
    return () => { document.title = previousTitle; };
  }, []);

  const handleLogin = async () => {
    setLoggingIn(true);
    setLoginError('');
    const result = await dispatch(loginToSpotify());
    if (loginToSpotify.rejected.match(result)) {
      setLoginError('We couldn’t connect to Spotify. Please try logging in again.');
    }
    setLoggingIn(false);
  };

  return (
    <div className='welcome-page'>
      <header className='welcome-header'>
        <a className='welcome-brand' href='/' aria-label='Spotify home'><FaSpotify aria-hidden='true' /><span>Spotify</span></a>
        <span className='welcome-header-note'>A new home for your music.</span>
        <a className='welcome-help' href='https://support.spotify.com/us/article/importing-your-playlists-to-spotify/' target='_blank' rel='noopener noreferrer'>Need a hand? <FiExternalLink aria-hidden='true' /></a>
      </header>

      <main className='welcome-main'>
        <section className='welcome-story' aria-labelledby='welcome-title'>
          <span className='welcome-eyebrow'><span /> ALL YOUR MUSIC. ALL YOUR YOU.</span>
          <h1 id='welcome-title'>New home.<br /><span>Same soundtrack.</span></h1>
          <p className='welcome-description'>The songs you love. The playlists you’ve made.<br className='welcome-desktop-break' /> Bring them along. Find even more to love.</p>
          <PlaylistArtwork />
          <p className='welcome-story-note'><FiHeadphones aria-hidden='true' /> Your next chapter sounds like you.</p>
        </section>

        <section className='welcome-entry' aria-label='Get started with Spotify'>
          <div className='welcome-login'>
            <FaSpotify className='welcome-login-mark' aria-hidden='true' />
            <h2>Let’s get you listening.</h2>
            <p>All your favorites. One place to call home.</p>
            {spotifyConfigured ? (
              <button className='welcome-button welcome-button--white' onClick={handleLogin} disabled={loggingIn}>{loggingIn ? 'Connecting…' : 'Log in to Spotify'}<FiArrowRight aria-hidden='true' /></button>
            ) : (
              <a className='welcome-button welcome-button--white' href='https://accounts.spotify.com/login'>Log in to Spotify <FiArrowRight aria-hidden='true' /></a>
            )}
            {loginError && <p className='welcome-login-error' role='alert'>{loginError}</p>}
            <p className='welcome-signup'>New here? <a href={signupUrl} target='_blank' rel='noopener noreferrer'>Sign up for free <FiExternalLink aria-label='opens in a new tab' /></a></p>
          </div>

          <div className='welcome-divider'><span>MAKE YOURSELF AT HOME</span></div>

          <div className='welcome-import-card'>
            <div className='welcome-provider-stack' aria-label='Apple Music, YouTube Music, Amazon Music, and more'>
              {providers.map(({ id, icon: Icon }) => <span className={`provider-icon provider-icon--${id}`} key={id}><Icon aria-hidden='true' /></span>)}
              <span className='provider-bridge'><FiArrowRight aria-hidden='true' /></span><FaSpotify className='provider-destination' aria-label='to Spotify' />
            </div>
            <h2>Switching music apps?</h2>
            <p>Your music comes with you. Import your playlists from Apple Music, YouTube Music, and more.</p>
            <button className='welcome-button welcome-button--green' onClick={() => setImportOpen(true)}>Import your music <FiArrowRight aria-hidden='true' /></button>
            <div className='welcome-powered'><FiMusic aria-hidden='true' /><span>Powered by <strong>TuneMyMusic</strong></span></div>
          </div>

          <details className='welcome-faq'>
            <summary>How does importing work? <FiChevronDown aria-hidden='true' /></summary>
            <p>TuneMyMusic copies your selected playlists to Spotify. Connect your music accounts, pick what to bring, and confirm the transfer. Your original playlists stay where they are.</p>
            <p>Available songs and transfer limits vary by service. You can review any costs and unmatched tracks on TuneMyMusic.</p>
          </details>
        </section>
      </main>

      <footer className='welcome-footer'>
        <span>Good music. No starting over.</span>
        <nav aria-label='Footer'><a href='https://www.spotify.com/legal/privacy-policy/' target='_blank' rel='noopener noreferrer'>Privacy</a><a href='https://www.spotify.com/legal/end-user-agreement/' target='_blank' rel='noopener noreferrer'>Terms</a><span>Spotify concept demo</span></nav>
      </footer>
      <ImportMusicDialog open={importOpen} onClose={() => setImportOpen(false)} />
    </div>
  );
}
