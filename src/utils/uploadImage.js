import RNFetchBlob from 'rn-fetch-blob';
import { API } from '../configs/config';
import { getToken } from './asyncStorage';

export async function UPLOAD_IMAGE(image) {
  console.log('Image in upload:', image && image);
  const token = await getToken();
  return await RNFetchBlob.fetch(
    'POST',
    `${API.apiv1}/api/posts/image`,
    {
      'x-auth-token': token,
      'Content-Type': 'multipart/form-data',
    },
    [
      {
        name: 'file',
        filename: image.filename ?? 'banner',
        type: image.mime,
        data: RNFetchBlob.wrap(image.path),
      },
    ],
  )
    .then((res) => {
      const d = JSON.parse(res.data);
      console.log('RESPONSE RN_FETCH_BLOB IN CREATE POSTS:', d.path);
      return d.path;
    })
    .catch((err) => {
      console.error(err);
    });
}
