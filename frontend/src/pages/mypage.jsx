import React, { useEffect, useMemo, useCallback, useState } from 'react';
import Navbar from "~/components/navbar.jsx";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "~/redux/auth-slice.js";

const EditProfile = ({ onProfileUpdate }) => {
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchUserAccount();
  }, []);

  const fetchUserAccount = async () => {
    try {
      const accessToken = localStorage.getItem('access-token');
      const response = await axios.get('https://fit-conf.shop/api/v1/users/account', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.success) {
        const { email, imageUrl } = response.data.response;
        setEmail(email);
        setProfileImage(imageUrl || '/images/default-profile.png');
      }
    } catch (error) {
      console.error('Failed to fetch user account:', error);
    }
  };

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
        fetchUserAccount();
      } else {
        alert('프로필 이미지 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('이미지 업로드 실패', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    onProfileUpdate();
  };

  const handleSave = () => {
    onProfileUpdate();
  };

  return (
    <div className="w-[1520px] h-[954px] mx-[200px] my-[36px] bg-white mb-[36px]">
      <h1 className="h-[66px] text-black text-[44px] font-bold text-left pb-[80px]">
        프로필 수정
      </h1>
      
      
      <div className="flex mt-[40px]">
        <div className='flex flex-row ml-[100px]'>
          {/* 프로필 이미지 */}
          <img 
            src={profileImage}
            alt="Profile" 
            className="w-[100px] h-[100px] mb-[40px] rounded-full
              mt-[20px] mr-[40px]" 
          />
          <div className='flex flex-col'>
            <label 
              className="w-[640px] h-[33px] text-left text-[22px] 
                text-[#131212] font-medium leading-[150%] mb-[16px]">
                  내 계정
            </label>
            <input
              type="text"
              value={email}
              readOnly
              className="pl-[20px] pr-[20px] pt-[12px] pb-[12px] border bg-[#FAFAFA] text-[#A9ABB4]
                w-[640px] h-[54px] text-[20px] font-medium leading-[150%] text-left"
            />
            <p className='text-[#606166] mt-[12px] ml-[20px]'>
              간편 로그인으로 연결되었습니다.
            </p>

            {/* 이미지 업로드 폼 */}
            <div className="flex flex-row mt-[20px] mb-[40px]">
              <input type="file" onChange={handleFileChange} accept="image/*" />
              <button onClick={handleImageUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
                프로필 이미지 업데이트
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className='flex flex-col ml-[100px]'>
          <label 
            className="w-[640px] h-[33px] text-left text-[22px] 
              text-[#131212] font-medium leading-[150%] mb-[16px]">
                이름
          </label>
          <input
            type="text"
            placeholder={lastName ? `${lastName} ❌` : "성과 이름은 입력한 경우엔 텍스트 색이 바뀌고, 엑스가 떠요"}
            className="pl-[20px] pr-[20px] pt-[12px] pb-[12px] 
              w-[640px] h-[54px] text-[20px] font-medium leading-[150%] text-left
              border bg-[#FAFAFA]"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      
      <div className="pb-[20px]" />

      <div className="flex">
        <div className='flex flex-col ml-[100px]'>
          <label 
            className="w-[640px] h-[33px] text-left text-[22px] 
              text-[#131212] font-medium leading-[150%] mb-[16px]">
                직무
          </label>
          <input
            type="text"
            placeholder="직무를 선택해주세요"
            className="pl-[20px] pr-[20px] pt-[12px] pb-[12px] w-[1320px] 
              h-[54px] text-[20px] font-medium leading-[150%] text-left"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="pb-[20px]" />

      <div className="flex">
        <div className='flex flex-col ml-[100px]'>
          <label 
            className="w-[640px] h-[33px] text-left text-[22px] 
              text-[#131212] font-medium leading-[150%] mb-[16px]">
                연차
          </label>
          <input
            type="text"
            placeholder="연차를 선택해주세요"
            className="pl-[20px] pr-[20px] pt-[12px] pb-[12px] w-[1320px] 
              h-[54px] text-[20px] font-medium leading-[150%] text-left"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="pb-[20px]" />

      <label className="pl-[100px] w-[1320px] h-[33px] text-left 
        text-[22px] text-[#131212] font-medium leading-[150%] pb-[16px] mb-[16px]">
          관심 분야
      </label>

      <div className="flex flex-wrap align-center h-[184px] ml-[100px] mr-[100px] bg-[#606166] mt-[16px]">
        <div className="flex text-left gap-[20px] mb-[20px] pl-[20px] pt-[24px]">
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
        </div>
        <div className="flex gap-[20px] pl-[20px]">
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
          <label className="w-[116px] h-[32px] pt-[6px] pb-[6px] text-center bg-white text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px]">Label</label>
        </div>
      </div>
      <p className="pl-[120px] pr-[120px] w-[1280px] h-[24px] text-left text-[#606166] text-[16px] font-medium leading-[150%] tracking-[-0.5px] mt-[16px] mb-[40px]">
        관심 분야 3가지 선택해주세요.
      </p>

      <div className="flex pl-[100px] pb-[50px]">
        <button className="w-[640px] h-[52px] text-center text-[#131212] text-[24px] font-medium leading-[150%] tracking-[-0.12px] border border-black" onClick={handleCancel}>
          취소하기
        </button>
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
  // 이미지 로딩 상태를 저장하는 state 추가
  const [imageLoadStatus, setImageLoadStatus] = useState({});

  useEffect(() => {
    fetchMySchedule();
    fetchAllSessions();
  }, []);

  const handleErrorResponse = (errorData) => {
    if (errorData?.message) {
      alert(`오류 발생: ${errorData.message}`);
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }
  };  

  const fetchMySchedule = async () => {
    const accessToken = localStorage.getItem("access-token"); 

    if (!accessToken) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('https://fit-conf.shop/api/v1/users/sessions', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.success) {
        setMySchedule(response.data.response.map(session => session.sessionId));
      } else {
        handleErrorResponse(response.data);
      }
    } catch (error) {
      console.error('API Error:', error);
      handleErrorResponse(error.response?.data);
    }
  }
    
  const fetchAllSessions = async () => {
    try {
      const response = await axios.get('https://fit-conf.shop/api/v1/session/all');
      console.log(response.data); // API 응답 구조 확인
      if (response.data.success) {
        // API 응답 구조에 맞춰서 세션 데이터를 추출합니다.
        setAllSessions(response.data.response.content || []);
      } else {
         handleErrorResponse(response.data);
      }
    } catch (error) {
       console.error('API Error:', error);
       handleErrorResponse(error.response?.data);
    }
  };

  const getSessionOpacity = (session) =>
    mySchedule.includes(session.sessionId)
      ? 'opacity-100'
      : 'opacity-50';
    
  const fetchUserProfile = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("access-token");

      if (!accessToken) {
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
        dispatch(loginSuccess({ user: response.data.response, token: accessToken }));
      } else {
        localStorage.removeItem('access-token');
        dispatch(logout());
        navigate('/login');
      }
    } catch (error) {
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
    fetchUserProfile();
  };

  const handleImageLoad = (sessionId) => {
    setImageLoadStatus((prevStatus) => ({
      ...prevStatus,
      [sessionId]: 'loaded',
    }));
  };
  
  const handleImageError = (sessionId) => {
    setImageLoadStatus((prevStatus) => ({
      ...prevStatus,
      [sessionId]: 'error',
    }));
  };  

  const toggleSchedule = async (sessionId) => {
    const accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
      navigate('/login');
      return;
    }
    try {
      const method = mySchedule.includes(sessionId) ? 'delete' : 'post';
      const response = await axios({
        method,
        url: `https://fit-conf.shop/api/v1/users/sessions/${sessionId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success) {
        setMySchedule(prevSchedule => 
          method === 'post' 
            ? [...prevSchedule, sessionId] 
            : prevSchedule.filter(id => id !== sessionId)
        );
      } else {
        handleErrorResponse(response.data);
      }
    } catch (error) {
      console.error('API Error:', error);
      handleErrorResponse(error.response?.data);
    }
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

          <div className="flex items-center justify-start space-x-6 px-5 py-5 mb-[60px]">
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
              <span className="w-[140px] h-full text-[#606166] text-lg pl-[10px] py-[20px]">
                직무
              </span>
              <span className="text-[#606166] text-lg pl-[60px] leading-[150%] 
                tracking-[-0.22px] font-bold py-[20px]">
                연차
              </span>
            </div>

            {/* 구분선 */}
            <hr className="border-[#E0E1E4] my-2" />

            {/* 두 번째 줄 */}
            <div className="flex py-[20px]">
              <span className="w-[140px] h-full text-[#606166] text-lg pl-[10px]">
                연차
              </span>
              <span className="text-[#606166] text-lg pl-[60px] 
                leading-[150%] tracking-[-0.22px] font-bold">
                연차
              </span>
            </div>

            {/* 구분선 */}
            <hr className="border-[#E0E1E4] my-2" />
            <div className="flex align-center">
              <div className="w-[140px] h-full mt-[24px] text-[#606166] text-lg ml-[10px] mr-[60px]">
                관심 분야
              </div>
              <div className="flex flex-wrap my-[20px] gap-2 sm:gap-5">
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium rounded-[4px]">Label</label>
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium rounded-[4px]">Label</label>
                <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium rounded-[4px]">Label</label>
              </div>
            </div>
          </div>

          <div className="text-black text-4xl font-bold leading-[150%] 
          tracking-[-0.22px] text-left px-5 pt-[100px]">
            나의 활동내역
          </div>

          <div className="px-5 py-16 flex flex-col">
            <div className="sm:flex-row items-start sm:items-center 
              sm:space-x-5 mb-4 mt-[40px] sm:ml-[40px]"
            >
              <div className="text-2xl font-bold text-[#606166] w-full sm:w-[240px] mb-[20px]">
                좋아요 표시한 강연
              </div>
              <div className="space-x-6 py-5 mb-[20px]">
                {/* 프로필 정보 */}
                <div className="flex items-center space-x-4">
                  {/* 프로필 이미지 */}
                  <div className="w-[32px] h-[32px] overflow-hidden rounded-[6px]">
                    <img
                      src=''
                      alt="profile"
                      className="object-cover w-full h-full bg-[gray]"
                    />
                  </div>
                  {/* 닉네임과 이메일 */}
                  <div className="flex flex-col gap-[2px]">
                    <div className="text-[14px] text-[#202023] font-bold leading-[150%] tracking-[-0.14px]">
                      암호화폐 규제와 글로벌 시장 대용 전략
                    </div>
                    <div className="text-[#606166] text-base font-medium leading-[150%]">
                      James Lee
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-[#E0E0E0]" />

            <div className="sm:flex-row items-start sm:items-center 
              sm:space-x-5 mb-4 mt-[40px] sm:ml-[40px]"
            >
              <div className="text-2xl font-bold text-[#606166] w-full sm:w-[240px] mb-[20px]">
                추천 강연
              </div>
              <div className="space-x-6 py-5 mb-[20px]">
                {/* 프로필 정보 */}
                <div className="flex items-center space-x-4">
                  {/* 프로필 이미지 */}
                  <div className="w-[32px] h-[32px] overflow-hidden rounded-[6px]">
                    <img
                      src=''
                      alt="profile"
                      className="object-cover w-full h-full bg-[gray]"
                    />
                  </div>
                  {/* 닉네임과 이메일 */}
                  <div className="flex flex-col gap-[2px]">
                    <div className="text-[14px] text-[#202023] font-bold leading-[150%] tracking-[-0.14px]">
                      암호화폐 규제와 글로벌 시장 대용 전략
                    </div>
                    <div className="text-[#606166] text-base font-medium leading-[150%]">
                      James Lee
                    </div>
                  </div>
                </div>
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
              {allSessions.map((session) => (
                <div key={session.sessionId} className="flex items-start space-x-[20px] pl-[40px]">
                <div className="flex-shrink-0 w-[100px] h-[288px] bg-white flex flex-col justify-center items-center text-black text-[22px] font-medium border border-black">
                  <div>
                    {session.startTime && new Date(session.startTime).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div>~</div>
                  <div>
                    {session.endTime && new Date(session.endTime).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <div className={`flex-shrink-0 flex flex-col w-[240px] h-[288px] border border-[#CCCDD2] ${getSessionOpacity(session)}`}>
                  <div className="w-[240px] h-[8px] bg-[#CCCDD2]" />
                  <div className="w-[216px] min-h-[60px] px-[12px] mb-[18px] text-black text-[18px] font-medium pt-[20px]">
                    {session.title || '스피커 제목 없음'}
                  </div>
                  <div className="w-full px-[12px] pb-[20px] text-[#85878D] text-[16px] font-medium">
                    {session.speaker?.name || '스피커 이름 없음'}
                  </div>
                  {imageLoadStatus[session.sessionId] === 'loading' && <div>Loading...</div>}
                  {imageLoadStatus[session.sessionId] === 'error' && <div>Error loading image</div>}
                  <img
                    src={session.speaker?.image || '/default-image.png'}
                    alt={`${session.title || '세션'} 이미지`}
                    className="w-full h-[120px] h-full object-cover"
                    onLoad={() => handleImageLoad(session.sessionId)}
                    onError={() => handleImageError(session.sessionId)}
                    style={{ display: imageLoadStatus[session.sessionId] === 'loaded' ? 'block' : 'none' }}
                  />
                </div>
              </div>
            ))}

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