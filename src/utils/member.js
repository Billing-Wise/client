import { useMemberStore } from "@/stores/member";
import { mainAxios } from "@/utils/axios";

const memberStore = useMemberStore();

// 회원 목록 조회
async function getMemberList(keyword, input) {

  let url = `members?page=${memberStore.page}&size=${memberStore.size}&${keyword}=${input}`;

  memberStore.columns.forEach(column => {
    if (column.sort != null) url += `&sort=${column.data},${column.sort}`
  });

  const result = await mainAxios.get(url);

  memberStore.setMaxPage(result.data.totalPages - 1);
  memberStore.setMemberList(result.data.content);

  return {'code': result.code, 'message' : result.message}
}

// 회원 등록
async function createMember(infos) {
  const result = await mainAxios.post('members', infos);

  return {'code': result.code, 'message' : result.message};
}

export { getMemberList, createMember }