import { useConsentDetailStore } from "@/stores/contract/consentDetail";
import { fileAxios, mainAxios } from "./axios"

const consentDetailStore = useConsentDetailStore();

// 동의서 조회
async function getConsent(memberId) {
  const result = await mainAxios.get(`consents/${memberId}`);

  if (result.code === 200) {
    consentDetailStore.setIsExist(true);
    consentDetailStore.setData(result.data);
  }

  return result;
}

// 동의서 등록
async function createConsent(memberId, data, file) {
  const formData = new FormData();
  const jsonData = JSON.stringify(data);

  const jsonBlob = new Blob([jsonData], { type: 'application/json' });
  formData.append('data', jsonBlob, 'item');
  formData.append('signImage', file, 'image');
  const result = await fileAxios.post(`consents/${memberId}`, formData);

  if (result.code === 200) {
    consentDetailStore.setIsExist(true);
    consentDetailStore.setData(result.data);
  }

  return result;
}

// 동의서 수정
async function editConsent(memberId, data) {
  const result = await mainAxios.put(`consents/${memberId}`, data);

  if (result.code === 200) {
    consentDetailStore.setData(result.data);
  }

  return result;
}

// 동의 서명 이미지 수정
async function editConsentImage(memberId, file) {
  const formData = new FormData();
  formData.append('signImage', file, 'image');

  const result = await fileAxios.put(`consents/${memberId}/image`, formData);

  if (result.code === 200) {
    consentDetailStore.setData(result.data);
  }

  return result;
}

export { getConsent, createConsent, editConsent, editConsentImage }