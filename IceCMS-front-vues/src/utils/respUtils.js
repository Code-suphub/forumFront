
export function getResultRespData(resp){
  return resp.data.data;
}
export function getResultRespMsg(resp){
  return resp.data.msg;
}

export function getResultRespCode(resp){
  return resp.data.code;
}
export function getListRespMsg(resp){
  return resp.data.msg;
}

export function getListRespData(resp){
  return resp.data.data.list;
}

export function getListRespTotal(resp){
  return resp.data.total;
}

export function getListRespPage(resp){
  return resp.data.data.page;
}
