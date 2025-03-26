import React, { useEffect, useCallback, useState } from 'react';
import Navbar from "~/components/navbar.jsx";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "~/redux/auth-slice.js";

const EditProfile = ({ onProfileUpdate }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleCancel = () => {
    onProfileUpdate();
  };

  const handleSave = () => {
    onProfileUpdate();
  };

  return (
    <div className="w-[1520px] h-[954px] mx-[200px] my-[36px] bg-white">
      <h1 className="w-[200px] h-[66px] text-black text-[44px] font-bold text-left pl-[100px] pb-[80px]">
        프로필 수정
      </h1>
      <img src="./public/images/default-profile.png" alt="Profile" className="w-[100px] h-[100px] pl-[100px] mb-[40px]" />

      <div className="flex">
        <div className="mr-[40px]">
          <label className="w-[640px] h-[33px] text-left text-[22px] text-[#131212] font-medium leading-[150%] pb-[16px] pl-[100px]">성</label>
          <input
            type="text"
            placeholder={firstName ? `${firstName} ❌` : "성을 입력해주세요"}
            className="pl-[20px] pr-[20px] pt-[12px] pb-[12px] w-[640px] h-[54px] text-[20px] font-medium leading-[150%] text-left"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label className="w-[640px] h-[33px] text-left text-[22px] text-[#131212] font-medium leading-[150%] pb-[16px]">이름</label>
          <input
            type="text"
            placeholder={lastName ? `${lastName} ❌` : "이름을 입력해주세요"}
            className="pl-[20px] pr-[20px] pt-[12px] pb-[12px] w-[640px] h-[54px] text-[20px] font-medium leading-[150%] text-left"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="pb-[20px]" />

      <label className="pl-[100px] w-[1320px] h-[33px] text-left text-[22px] text-[#131212] font-medium leading-[150%] pb-[16px]">직무</label>
      <input
        type="text"
        placeholder="직무를 선택해주세요"
        className="pl-[100px] w-[1320px] h-[54px] pt-[12px] pb-[12px] pl-[20px] pr-[20px] text-[20px] font-medium leading-[150%] text-left text-[#85878D]"
      />
      <div className="pb-[20px]" />

      <label className="pl-[100px] w-[1320px] h-[33px] text-left text-[22px] text-[#131212] font-medium leading-[150%] pb-[16px]">연차</label>
      <input
        type="text"
        placeholder="연차를 선택해주세요"
        className="pl-[100px] w-[1320px] h-[54px] pt-[12px] pb-[12px] pl-[20px] pr-[20px] text-[20px] font-medium leading-[150%] text-left text-[#85878D]"
      />
      <div className="pb-[20px]" />

      <label className="pl-[100px] w-[1320px] h-[33px] text-left text-[22px] text-[#131212] font-medium leading-[150%] pb-[16px]">관심 분야</label>

      <div className="pl-[100px] pr-[100px] pt-[24px] pb-[24px] pl-[320px] pr-[320px] bg-[#606166]">
        <div className="flex justify-center gap-[20px] mb-[20px]">
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
        </div>
        <div className="flex justify-center gap-[20px] mb-[20px]">
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
        </div>
        <div className="flex justify-center gap-[20px]">
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
        </div>
      </div>
      <p className="pl-[120px] pr-[120px] w-[1280px] h-[24px] text-left text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px] mt-[16px] mb-[40px]">관심 분야는 최대 3가지 선택해주세요.</p>

      <div className="flex pl-[100px]">
        <button className="w-[640px] h-[52px] text-center text-[#131212] text-[24px] font-medium leading-[150%] tracking-[-0.12px]" onClick={handleCancel}>취소하기</button>
        <div className="w-[40px]" />
        <button className="w-[640px] h-[52px] bg-[#131212] text-white text-center text-[24px] font-medium leading-[150%] tracking-[-0.12px]" onClick={handleSave}>저장하기</button>
      </div>
    </div>
  );
};

const Mypage = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mySchedule, setMySchedule] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchMySchedule();
    fetchAllSessions();
  }, []);

  const handleApiRequest = async (apiCall, setState) => {
    try {
      const response = await apiCall();
      if (response.data.success) {
        setState(response.data.response || []);
      } else {
        handleErrorResponse(response.data);
      }
    } catch (error) {
      console.error('API Error:', error);
      handleErrorResponse(error.response?.data);
    }
  };

  const fetchMySchedule = () =>
    handleApiRequest(
      () => axios.get('https://fit-conf.shop/api/v1/users/sessions'),
      (data) => setMySchedule(data || [])
    );

  const fetchAllSessions = () =>
    handleApiRequest(
      () => axios.get('https://fit-conf.shop/api/v1/session/all'),
      (data) => setAllSessions(data?.content || [])
    );

  const getSessionOpacity = (session) =>
    mySchedule.some(mySession => mySession.sessionId === session.id)
      ? 'opacity-100'
      : 'opacity-50';
    
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      alert('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('requestImage', selectedFile);

    try {
      const accessToken = localStorage.getItem('access-token');
      const response = await axios.put(
        'https://fit-conf.shop/api/v1/users/profile/image',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        alert('프로필 이미지가 성공적으로 업데이트되었습니다.');
        // 프로필 정보 새로고침
        fetchUserProfile();
      } else {
        alert('프로필 이미지 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('이미지 업로드 실패', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    }
  };
    
  const fetchUserProfile = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("access-token");

      if (!accessToken) {
        console.warn('Access token not found. Redirecting to login.');
        navigate('/login');
        return;
      }

      const response = await axios.get(
        "https://fit-conf.shop/api/v1/users/account",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        const userData = response.data.response;
        dispatch(loginSuccess({ user: userData, token: accessToken }));
        console.log(userData);
      } else {
        console.error("사용자 정보 조회 실패", response.data);
        localStorage.removeItem('access-token');
        dispatch(logout());
        navigate('/login');
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      localStorage.removeItem('access-token');
      dispatch(logout());
      navigate('/login');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user?.email) {
      fetchUserProfile();
    }
  }, [user?.email, fetchUserProfile]);

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    dispatch(logout());
    navigate("/login");
  };

  const handleEditProfileClick = () => {
    setIsEditingProfile(true);
  };

  const handleProfileUpdate = () => {
    setIsEditingProfile(false);
  };

  return (
    <>
      <Navbar />

      {isEditingProfile ? (
        <EditProfile onProfileUpdate={handleProfileUpdate} />
      ) : (
        <div className="w-full max-w-[1520px] mx-auto px-5 pb-16">
          {/* 계정 정보 */}
          <div className="text-black text-4xl font-bold leading-[150%] 
          tracking-[-0.22px] text-left px-5 pb-16">
            계정정보
          </div>

          <div className="flex items-center justify-start space-x-6 px-5 py-5 mb-[20px]">
            {/* 프로필 정보 */}
            <div className="flex items-center space-x-4">
              {/* 프로필 이미지 */}
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden">
                <img
                  src={user?.imageUrl || "/images/default-profile.png"}
                  alt="profile"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>

              {/* 닉네임과 이메일 */}
              <div className="flex flex-col">
                <div className="text-black text-2xl font-bold leading-[150%] tracking-[-0.14px]">
                  {user?.name || "이름을 가져오지 못 했습니다"}
                </div>
                <div className="text-[#606166] text-base font-medium leading-[150%]">
                  {user?.email || "이메일을 가져오지 못 했습니다"}
                </div>
              </div>
            </div>

            {/* 이미지 업로드 폼 */}
            <div className="mt-4">
              <input type="file" onChange={handleFileChange} accept="image/*" />
              <button onClick={handleImageUpload}>프로필 이미지 업데이트</button>
            </div>

            {/* 로그아웃 버튼 */}
            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 
                rounded-lg hover:bg-red-600 transition whitespace-nowrap"
              >
                로그아웃
              </button>
            )}

            {/* 화살표 아이콘 */}
            <div className="ml-auto flex justify-end w-full">
              <button onClick={handleEditProfileClick} className="flex font-bold text-[#45464A]">
                <span>프로필 수정</span>
                <span>
                  <img
                    src="./public/images/chevron-left.png"
                    alt="Arrow"
                    className="w-6 h-6"
                  />
                </span>
              </button>
            </div>
          </div>

          {/* 직무 및 연차 정보 */}
          <div className="bg-[#FAFAFA] px-5 py-5">
            {/* 첫 번째 줄 */}
            <div className="flex">
              <span className="text-[#606166] text-lg pl-[40px]">
                직무
              </span>
              <span className="text-[#606166] text-lg pl-[40px] leading-[150%] tracking-[-0.22px] font-bold">
                연차
              </span>
            </div>

            {/* 구분선 */}
            <hr className="border-[#E0E1E4] my-2" />

            {/* 두 번째 줄 */}
            <div className="flex">
              <span className="text-[#606166] text-lg pl-[40px]">
                연차
              </span>
              <span className="text-[#606166] text-lg pl-[40px] leading-[150%] tracking-[-0.22px] font-bold">
                연차
              </span>
            </div>

            {/* 구분선 */}
            <hr className="border-[#E0E1E4] my-2" />

            {/* 두 번째 줄 */}
            <div className="flex">
              <span className="text-[#606166] text-lg pl-[40px] mr-[60px]">
                관심 분야
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-5">
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              </div>
            </div>
          </div>

          {/* 나의 활동 내역 */}
          <div className="text-black text-4xl font-bold leading-[150%] 
          tracking-[-0.22px] text-left px-5 pt-[60px]">
            나의 활동 내역
          </div>
          <div className="px-5 py-16 flex flex-col">
            {/* 좋아요 표시한 강연 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center 
              sm:space-x-5 mb-4 py-[40px] sm:ml-[40px]"
            >
              <div className="text-[#606166] text-lg w-full sm:w-[240px]">좋아요 표시한 강연</div>
              <div className="flex flex-wrap gap-2 sm:gap-5">
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              </div>
            </div>

            <hr className="border-[#E0E0E0]" />

            {/* AI 추천 강연 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-5 mb-4 pb-[40px] sm:ml-[40px] pt-[40px]">
              <div className="text-[#606166] text-lg w-full sm:w-[240px]">AI 추천 강연</div>
              <div className="flex flex-wrap gap-2 sm:gap-5">
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[1520px] min-h-[1836px] mx-auto overflow-x-auto">
            <h2 className="text-black text-[40px] font-bold 
              leading-[150%] tracking-[-0.2px] px-[20px] pt-[32px] pb-[60px]"
            >
              나의 스케줄
            </h2>

            <div className="space-y-[20px]">
              {/* 세션 표시 영역 */}
              {allSessions && allSessions.map((session) => (
                <div key={session.id} className="flex items-start space-x-[20px] pl-[40px]">
                  <div className="flex-shrink-0 w-[100px] h-[288px] bg-white flex flex-col justify-center items-center text-black text-[22px] font-medium border border-black">
                    <div>
                      {new Date(session.startTime).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div>~</div>
                    <div>
                      {new Date(session.endTime).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>

                  <div className={`flex-shrink-0 flex flex-col w-[240px] h-[288px] border border-[#CCCDD2] ${getSessionOpacity(session)}`}>
                    <div className="w-[240px] h-[8px] bg-[#CCCDD2]" />
                    <div className="w-[216px] min-h-[60px] px-[12px] pb-[12px] text-black text-[18px] font-medium pt-[20px]">
                      {session.title}
                    </div>
                    <div className="w-full px-[12px] pb-[20px] text-[#85878D] text-[16px] font-medium">
                      {session.speaker?.name || '스피커 정보 없음'}
                    </div>
                    <img
                      src={session.sessionImage || '/default-image.png'}
                      alt="세션 이미지"
                      className="w-full h-[120px] object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default-image.png';
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* 데이터 없을 경우 표시 */}
              {allSessions?.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                  등록된 세션이 없습니다
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default Mypage;
