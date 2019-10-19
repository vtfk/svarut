module.exports = async (forsendelseIds, instance) => {
  try {
    const body = Array.isArray(forsendelseIds) ? forsendelseIds : [forsendelseIds]
    const { data } = await instance.post('statuser', body)
    return data
  } catch (error) {
    if (error.response) return (error.response.data)
    throw error
  }
}
