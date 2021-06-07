import request from '../utils/request';

export function uploadSingle(file) {
  return request.post2('/v1/upload/single', file);
}
export function uploadMultiple(files) {
  console.log("files", files)
    return request.post2('/v1/upload/multiple', files);
  }

