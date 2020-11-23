export interface User {
  id: string
  email: string
  displayName: string
  photoURL: string
  provider: string
  lastSeen: number
  subscription?: string
  emailVerified: boolean
  isLoading: boolean
  notifications: {
    verseOfTheDay: string
    notificationId: string
  }
  changelog: {
    isLoading: boolean
    lastSeen: number
    data: any[]
  }
  needsUpdate: {
    [x: string]: boolean
  }
  fontFamily: string
  bible: {
    changelog: {}
    highlights: {
      [x: string]: {
        color: string
        tags: {
          [x: string]: { id: string; name: string }
        }
        date: number
      }
    }
    notes: {}
    studies: {
      [x: string]: Study
    }
    tags: {}
    history: any[]
    strongsHebreu: {}
    strongsGrec: {}
    words: {}
    naves: {}
    settings: {
      alignContent: string
      fontSizeScale: number
      textDisplay: string
      theme: 'default' | 'dark' | 'black' | 'sepia'
      press: string
      notesDisplay: string
      commentsDisplay: boolean
      colors: {
        default: any
        dark: any
        black: any
        sepia: any
      }
      compare: {
        [x: string]: boolean
      }
    }
  }
}

export interface Delta {
  ops: {
    insert: string
    attributes: {
      [x: string]: any
    }
  }[]
}

export interface Study {
  id: string
  title: string
  created_at: number
  content: Delta
  published?: boolean
  user: {
    displayName: string
    id: string
    photoUrl: string
  }
  tags?: {
    [x: string]: {
      id: string
      name: string
    }
  }
}
