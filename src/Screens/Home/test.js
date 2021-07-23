else if(value1){
  rating= value1
  setdata({...data, isLoading: true})
  var payload = {};
  const url = `${API_BASE}/restro/combinedSearchSortFilter`
  payload = {
   userid: user?._id,
   lat: 28.4922,
   lng: 77.0966,
   distance:undefined,
   rating_from_user:value1+"",
   is_sort: `${false}`,
   is_filter:`${true}`,
   restaurent_type:restro_type,

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
   
   alert("Error",error);
 }

 {(value1).toFixed(1)} Miles