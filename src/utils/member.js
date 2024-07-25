import { useMemberStore } from "@/stores/member";
import { useMemberBulkStore } from "@/stores/memberBulk";
import { fileAxios, mainAxios } from "@/utils/axios";

const memberStore = useMemberStore();
const memberBulkStore = useMemberBulkStore();

// 회원 목록 조회
async function getMemberList(keyword, input) {
  let url = `members?page=${memberStore.page}&size=${memberStore.size}&${keyword}=${input}`;

  memberStore.columns.forEach(column => {
    if (column.sort != null) url += `&sort=${column.data},${column.sort}`
  });

  const result = await mainAxios.get(url);

  if (result.code === 200) {
    memberStore.setMaxPage(result.data.totalPages - 1);
    memberStore.setMemberList(result.data.content);
  }

  return result;
}

// 회원 상세 조회
async function getMember(memberId) {
  const result = await mainAxios.get(`members/${memberId}`);

  if (result.code === 200) {
    memberStore.setCurrentMember(result.data);
  }

  return result;
}

// 회원 등록
async function createMember(infos) {
  const result = await mainAxios.post('members', infos);

  return result;
}

// 회원 대량 등록
async function createMemberBulk(file) {
  const formData = new FormData();
  formData.append('file', file, 'file');

  const result = await fileAxios.post('members/bulk-register', formData);

  if (result.code !== 200) {
    if (result.data) {
      memberBulkStore.errorList = [...result.data];
    } else {
      memberBulkStore.errorList = [result.message];
    }
  }

  return result;
}


// 회원 수정
async function updateMember(memberId, infos) {
  const result = await mainAxios.put(`members/${memberId}`, infos);
  
  if (result.code === 200) {
    memberStore.setCurrentMember(result.data);
  }

  return result;
}

// 회원 삭제
async function deleteMember(memberId) {
  const result = await mainAxios.delete(`members/${memberId}`);

  return result;
}

export { getMemberList, getMember, createMember, createMemberBulk, updateMember, deleteMember }