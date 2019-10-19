module.exports = async (instance) => {
  try {
    const { data } = await instance.get('forsendelseTyper')
    return data
  } catch (error) {
    if (error.response) return (error.response.data)
    throw error
  }
}
