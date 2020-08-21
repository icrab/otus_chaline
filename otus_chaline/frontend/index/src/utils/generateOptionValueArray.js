export function generateOptionValueArray(storage_type){
  let gramms = []
  if (storage_type == 0){
    const gramms_arr_length = 6;
    const base_gramms = 50
    for (let gramm_count = 0; gramm_count < gramms_arr_length; gramm_count++) {
        gramms.push(gramm_count * base_gramms);
    }
  } else {
    const gramms_arr_length = 6;
    for (let gramm_count = 0; gramm_count < gramms_arr_length; gramm_count++) {
        gramms.push(gramm_count);
    }
  }
  return gramms;
}
