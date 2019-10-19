module.exports = async (eksternref, instance) => {
  try {
    const { data } = await instance.get(`eksternref/${eksternref}`)
    return data
  } catch (error) {
    if (error.response) return (error.response.data)
    throw error
  }
}
