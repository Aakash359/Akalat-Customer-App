const onSearch = async () => {
  var restro_type = ''
  if (isEnabled) {
    restro_type = 'non_veg'
  } else {
    restro_type = 'veg'
  }
  var data = search
  if ((data = !search)) {
    setdata({...data, isLoading: true})

    const url = `${API_BASE}/restro/combinedSearchSortFilter`
    var payload = {}
    if (activeTab == 0) {
      payload = {
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        relevance: true,
        is_sort: `${true}`,
        is_filter: `${false}`,
      }
    } else if (activeTab == 1) {
      payload = {
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        rating_high_to_low: true,
        is_sort: `${true}`,
        is_filter: `${false}`,
      }
    } else if (activeTab == 2) {
      payload = {
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        rating_low_to_high: true,
        is_sort: `${true}`,
        is_filter: `${false}`,
      }
    } else if (activeTab == 3) {
      payload = {
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        delivery_time: true,
        is_sort: `${true}`,
        is_filter: `${false}`,
      }
    }
    try {
      const res = await axios.post(url, payload)
      setdata({
        ...data,
        restroList: res?.data?.data?.restroNearMe,
      })
      setModal2(false)
      setModal(false)
      navigate('NearMe')
    } catch (error) {
      console('Error', error)
    }
  } else if (search) {
    setdata({...data, isLoading: true})

    const url = `${API_BASE}/restro/combinedSearchSortFilter`
    const payload = {
      searchKey: search,
      userid: user?._id,
      lat: 28.4922,
      lng: 77.0966,
      is_sort: `${false}`,
      is_filter: `${false}`,
    }
    try {
      const res = await axios.post(url, payload)
      setdata({
        ...data,
        restroList: res?.data?.data?.restroNearMe,
      })
      setModal2(false)
      setModal(false)
      navigate('NearMe')
    } catch (error) {
      alert('Error', error)
    }
  } else {
    setdata({...data, isLoading: true})

    const url = `${API_BASE}/restro/combinedSearchSortFilter`

    const payload = {
      userid: user?._id,
      lat: 28.4922,
      lng: 77.0966,
      is_sort: `${false}`,
      is_filter: `${false}`,
    }

    try {
      const res = await axios.post(url, payload)
      setdata({
        ...data,
        restroList: res?.data?.data?.restroNearMe,
      })
    } catch (error) {}
  }
}