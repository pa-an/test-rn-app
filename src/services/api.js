export const URLS = {
  Transaction: 'https://gist.githubusercontent.com/sverraest/7be1341f3a92391edf629c09c8749d15/raw/ee87f5c1722b9b11198a35cba5fd9d068135adf4/gistfile1.txt',
}

export default class API {
  get = async (url) => {
    try {
      const response = await fetch(url)
      return response.json()
    } catch (e) {
      return { error: e.message }
    }
  }
}
