export interface Task {
  _id?: string
  title: string
  description: string
  share: string[]
  user: {
    name: string
    email: string
  }
}
