module.exports = async (forsendelseId, instance) => {
  try {
    const { data } = await instance.get(`${forsendelseId}/signeringhistorikk`)
    return data
  } catch (error) {
    if (error.response) return (error.response.data)
    throw error
  }
}
