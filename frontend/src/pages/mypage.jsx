import React, { useEffect, useCallback, useState } from 'react'
import Navbar from "~/components/navbar.jsx"
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "~/redux/auth-slice.js";

const Mypage = () => {
  // Redux 상태에서 사용자 정보 가져오기
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 사용자의 스케줄 데이터 상태
  const [mySchedule, setMySchedule] = useState([]);
  // 모든 세션 데이터 상태
  const [allSessions, setAllSessions] = useState([]);

  // 컴포넌트가 마운트될 때 실행되는 함수
  useEffect(() => {
    // 사용자의 스케줄 데이터를 가져옵니다
    fetchMySchedule();
    // 모든 세션 데이터를 가져옵니다
    fetchAllSessions();
  }, []);

  const handleErrorResponse = (errorData) => {
    if (errorData?.statusName === 'UNAUTHORIZED') {
      alert('로그인이 필요합니다');
      navigate('/login');
    } else {
      console.error('API Error:', errorData);
    }
  };

  // API 요청 공통 처리 함수
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

  // 내 스케줄 조회
  const fetchMySchedule = () => 
    handleApiRequest(
      () => axios.get('/api/v1/users/sessions'),
      (data) => setMySchedule(data || [])
    );

  // 전체 세션 조회
  const fetchAllSessions = () => 
    handleApiRequest(
      () => axios.get('/api/v1/session/all'),
      (data) => setAllSessions(data?.content || [])
    );

  // 세션 투명도 계산
  const getSessionOpacity = (session) => 
    mySchedule.some(mySession => mySession.sessionId === session.id) 
      ? 'opacity-100' 
      : 'opacity-50';

  // 사용자 정보를 가져오는 함수
  const fetchUserProfile = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("access-token");
      console.log("Access Token:", accessToken);

      if (!accessToken) {
        console.warn('Access token not found. Redirecting to login.');
        navigate('/login');
        return;
      }

      const response = await axios.get(
        "http://localhost:8080/api/v1/users/account",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        const userData = response.data.response;
        dispatch(loginSuccess({ user: userData, token: accessToken }));
      } else {
        console.error("사용자 정보 조회 실패", response.data);
        // 실패 시 로그아웃 처리 또는 에러 메시지 표시
        localStorage.removeItem('access-token');
        dispatch(logout());
        navigate('/login');
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      // 오류 발생 시 로그아웃 처리 또는 에러 메시지 표시
      localStorage.removeItem('access-token');
      dispatch(logout());
      navigate('/login');
    }
  }, [dispatch, navigate]);

  // 사용자 정보가 없으면 프로필 불러오기
  useEffect(() => {
    if (!user?.email) {
      fetchUserProfile();
    }
  }, [user?.email, fetchUserProfile]);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("access-token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Navbar className="mb-[100px]" />

      <div className="w-full max-w-[1520px] mx-auto px-5 py-16">
        {/* 계정 정보 */}
        <div className="text-black text-4xl font-bold leading-[150%] 
          tracking-[-0.22px] text-left px-5 py-16">
          계정정보
        </div>
 
        <div className="bg-[#FAFAFA] flex items-center justify-start space-x-6 px-5 py-5 mb-[20px]">
          {/* 프로필 정보 */}
          <div className="flex items-center space-x-4">
            {/* 프로필 이미지 */}
            <div className="w-[88px] h-[88px] rounded-full overflow-hidden">
              <img 
                src={user?.profileImage || "./public/images/Ellipse 7.png"}
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
            <img src="./public/images/chevron-left.png" alt="Arrow" className="w-6 h-6" />
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
        </div>

        {/* 나의 활동 내역 */}
        <div className="text-black text-4xl font-bold leading-[150%] 
          tracking-[-0.22px] text-left px-5 py-[60px]">
          나의 활동 내역
        </div>

        {/* 관심 분야 + 라벨 그룹 */}
        <div className="px-5 py-16 flex flex-col">
          {/* 관심 분야 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-5 mb-4 pb-[40px] sm:ml-[40px]">
            <div className="text-[#606166] text-lg w-full sm:w-[240px]">관심 분야</div>
            <div className="flex flex-wrap gap-2 sm:gap-5">
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
            </div>
          </div>

          <hr className="border-[#E0E0E0]" />

          {/* 좋아요 표시한 강연 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-5 mb-4 py-[40px] sm:ml-[40px]">
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
          <h2 className="text-black text-[40px] font-bold leading-[150%] tracking-[-0.2px] px-[20px] pt-[32px] pb-[60px]">
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
    </>
  )
};

export default Mypage;
