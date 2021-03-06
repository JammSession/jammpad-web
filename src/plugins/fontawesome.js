import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// fas
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkSquareAlt'
import { faGem } from '@fortawesome/free-solid-svg-icons/faGem'
import { faStop } from '@fortawesome/free-solid-svg-icons/faStop'
import { faStickyNote } from '@fortawesome/free-solid-svg-icons/faStickyNote'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { faVoteYea } from '@fortawesome/free-solid-svg-icons/faVoteYea'

// fab
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord'
import { faEthereum } from '@fortawesome/free-brands-svg-icons/faEthereum'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { faMedium } from '@fortawesome/free-brands-svg-icons/faMedium'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faTelegram} from '@fortawesome/free-brands-svg-icons/faTelegram'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

library.add(
  faExternalLinkSquareAlt,
  faGem,
  faStop,
  faStickyNote,
  faSpinner,
  faLock,
  faPlay,
  faVoteYea,
  faDiscord,
  faMedium,
  faEthereum,
  faGithub,
  faGoogle,
  faTwitter,
  faTelegram
)

// Register the component globally
Vue.component('fa-icon', FontAwesomeIcon)
