import { StyleSheet } from '../../utils/style'
import logo from '../../static/logo3000.webp'
import { links } from '../../utils/constants'

const styles = StyleSheet.create({
  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    flex: 1,
    fontSize: '18pt',
    display: 'inline-block'
  },
  get rightText() {
    return StyleSheet.compose(this.text, {
      textAlign: 'right'
    })
  },
  logoLink: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '5px',
    textDecoration: 'none'
  },
  logo: {
    height: '60px'
  }
})

export default function DocumentHeader() {
  return (
    <div style={styles.div}>
      <a
        style={styles.logoLink}
        rel="noreferrer noopener"
        target="_blank"
        href={links.polinetwork}
      >
        <img src={logo} alt="logo" style={styles.logo} />
        <h1 style={styles.text}>PoliNetwork</h1>
      </a>
      <h1 style={styles.rightText}>The TOL Project</h1>
    </div>
  )
}
