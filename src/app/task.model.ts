export interface Task {
  title: string,
  description: string,
  share: [string],
  user: {
    name: string,
    email: string
  }
}
