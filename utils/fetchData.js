const axios = require("axios")

const cycleThroughPages = async (url, pages) => {
  let pageLength = Array.from(Array(pages), (_, i) => i + 1)
  let response = await axios.all(
    pageLength.map(item => axios.get(`${url}?page=${item}`))
  )
  let data = await response.map(item => item.data.results)
  return [].concat.apply([], data)
}

module.exports = cycleThroughPages
