import React, { useEffect, useCallback, useState } from 'react';
import Navbar from "~/components/navbar.jsx";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "~/redux/auth-slice.js";
import { motion, AnimatePresence } from 'framer-motion';

const EditProfile = ({ onProfileUpdate }) => {
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const [selectedValue, setSelectedValue] = useState("");

  const [isOpen2, setIsOpen2] = useState(false);
  const toggleOpen2 = () => setIsOpen2(!isOpen2);
  const [selectedValue2, setSelectedValue2] = useState("");

  const [selectedTags, setSelectedTags] = useState([]);

  const handleOptionClick = (value) => {
    setSelectedValue(value); // 선택된 값을 상태에 저장
    toggleOpen(); // 옵션 목록 닫기 (선택 후 자동으로 닫히도록)
  };  

  const handleOptionClick2 = (value2) => {
    setSelectedValue2(value2);
    toggleOpen2();
  };  

  const tags = [
    "규제 기술", "마이데이터", "개인 금융 관리", "크라우드펀딩", "대출", "핀테크 인프라", "투자 및 자산 관리",
    "블록체인 및 암호화폐", "금융 포용", "결제 및 송금", "디지털 뱅킹", "대출", "보험 테크"
  ];

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

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
    <div className="flex flex-col items-center justify-center w-full max-w-[1520px] h-auto lg:h-[954px] mx-auto my-[36px] bg-white lg:mb-[200px]">
      <h1 className="h-[66px] text-black text-[44px] font-bold pb-[80px] ml-[-1200px] mt-[170px]">
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
                text-[#131212] font-bold leading-[150%] mb-[16px]">
                  내 계정
            </label>
            <input
              type="text"
              value={email}
              readOnly
              className="pl-[20px] pr-[20px] pt-[12px] pb-[12px] border bg-[#FAFAFA] text-[#A9ABB4]
                w-[1180px] h-[54px] text-[20px] font-medium leading-[150%] text-left"
            />
            <p className='text-[#606166] mt-[12px] ml-[20px]'>
              간편 로그인으로 연결되었습니다.
            </p>

            {/* 이미지 업로드 폼 */}
            <div className="flex flex-row mt-[20px] mb-[40px]">
              <input type="file" onChange={handleFileChange} accept="image/*" />
              <button 
                onClick={handleImageUpload} 
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
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
              text-[#131212] font-bold leading-[150%] mb-[16px]">
                이름
          </label>
          <input
            type="text"
            placeholder={lastName ? `${lastName} ❌` : "성과 이름은 입력한 경우엔 텍스트 색이 바뀌고, 엑스가 떠요"}
            className="pl-[20px] pr-[20px] pt-[12px] pb-[12px] 
              w-[1320px] h-[54px] text-[20px] font-medium leading-[150%] text-left
              border bg-[#FAFAFA]"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      
      <div className="pb-[20px]" />

      <div className="flex flex-col">
        <div className="flex flex-col ml-[100px]">
          <label
            className="w-[640px] h-[33px] text-left text-[22px] 
              text-[#131212] font-bold leading-[150%] mb-[16px]">
                직무
          </label>
          <div className="relative w-[1320px] h-[54px] mb-[10px]">
            <input
              type="text"
              placeholder="직무를 선택해주세요"
              value={selectedValue} // 선택된 값 표시
              // onChange={(e) => setSelectedValue(e.target.value)} // 직접 입력 가능하도록
              className="bg-[#FAFAFA] pl-[20px] pr-[20px] pt-[12px] pb-[12px] w-full h-full 
                text-[20px] font-medium leading-[150%] text-left 
                placeholder:text-[#85878D]"
            />
            {/* 아이콘 이미지 */}
            <motion.img
              src="/images/show-icon.png"
              alt="아이콘"
              className="absolute top-[12px] right-[20px] w-[24px] h-[24px] cursor-pointer"
              onClick={toggleOpen}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col ml-[100px] w-[1320px] overflow-hidden border border-[#E0E0E0]"
            >
              <div className="pt-[12px] pb-[12px] pl-[28px] pr-[28px]">
                {/* 목록 아이템 */}
                <div className="border-b border-[#E0E0E0] py-[12px]" onClick={() => handleOptionClick("직무 선택 안함")}>
                  <span className="text-left text-[#131212] font-medium text-[20px] leading-[150%] cursor-pointer">
                    직무 선택 안함
                  </span>
                </div>
                <div className="border-b border-[#E0E0E0] py-[12px]" onClick={() => handleOptionClick("직무 없음")}>
                  <span className="text-left text-[#131212] font-medium text-[20px] leading-[150%] cursor-pointer">
                    직무 없음
                  </span>
                  <p className="text-left text-[#85878D] font-normal text-[16px] leading-[150%] mt-1">
                    ( 아직 재직 경험이 없어요 )
                  </p>
                </div>
                <div className="border-b border-[#E0E0E0] py-[12px]" onClick={() => handleOptionClick("주니어 직무")}>
                  <span className="text-left text-[#131212] font-medium text-[20px] leading-[150%] cursor-pointer">
                    주니어 직무
                  </span>
                </div>
                <div className="border-b border-[#E0E0E0] py-[12px]" onClick={() => handleOptionClick("미들 직무")}>
                  <span className="text-left text-[#131212] font-medium text-[20px] leading-[150%] cursor-pointer">
                    미들 직무
                  </span>
                </div>
                <div className="py-[12px]" onClick={() => handleOptionClick("시니어 직무")}>
                  <span className="text-left text-[#131212] font-medium text-[20px] leading-[150%] cursor-pointer">
                    시니어 직무
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pb-[20px]" />

      <div className="flex flex-col">
        <div className="flex flex-col ml-[100px]">
          <label
            className="w-[640px] h-[33px] text-left text-[22px] 
              text-[#131212] font-bold leading-[150%] mb-[16px]">
                연차
          </label>
          <div className="relative w-[1320px] h-[54px] mb-[10px]">
            <input
              type="text"
              placeholder="직무를 선택해주세요"
              value={selectedValue2} // 선택된 값 표시
              // onChange={(e) => setSelectedValue2(e.target.value)}
              className="bg-[#FAFAFA] pl-[20px] pr-[20px] pt-[12px] pb-[12px] w-full h-full 
                text-[20px] font-medium leading-[150%] text-left 
                placeholder:text-[#85878D]"
            />
            {/* 아이콘 이미지 */}
            <motion.img
              src="/images/show-icon.png"
              alt="아이콘"
              className="absolute top-[12px] right-[20px] w-[24px] h-[24px] cursor-pointer"
              onClick={toggleOpen2}
              animate={{ rotate: isOpen2 ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isOpen2 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col ml-[100px] w-[1320px] overflow-hidden border border-[#E0E0E0]"
            >
              <div className="pt-[12px] pb-[12px] pl-[28px] pr-[28px]">
                {/* 목록 아이템 */}
                <div className="border-b border-[#E0E0E0] py-[12px]" onClick={() => handleOptionClick2("연차 선택 안함")}>
                  <span className="text-left text-[#131212] font-medium text-[20px] leading-[150%] cursor-pointer">
                    연차 선택 안함
                  </span>
                </div>
                <div className="border-b border-[#E0E0E0] py-[12px]" onClick={() => handleOptionClick2("연차 없음")}>
                  <span className="text-left text-[#131212] font-medium text-[20px] leading-[150%] cursor-pointer">
                    연차 없음
                  </span>
                  <p className="text-left text-[#85878D] font-normal text-[16px] leading-[150%] mt-1">
                    ( 아직 재직 경험이 없어요 )
                  </p>
                </div>
                <div className="border-b border-[#E0E0E0] py-[12px]" onClick={() => handleOptionClick2("주니어 연차")}>
                  <span className="text-left text-[#131212] font-medium text-[20px] leading-[150%] cursor-pointer">
                    주니어 연차
                  </span>
                </div>
                <div className="border-b border-[#E0E0E0] py-[12px]" onClick={() => handleOptionClick2("미들")}>
                  <span className="text-left text-[#131212] font-medium text-[20px] leading-[150%] cursor-pointer">
                    미들
                  </span>
                </div>
                <div className="py-[12px]" onClick={() => handleOptionClick2("시니어 연차")}>
                  <span className="text-left text-[#131212] font-medium text-[20px] leading-[150%] cursor-pointer">
                    시니어 연차
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pb-[20px]" />

      <label className="pl-[50px] w-[1320px] h-[33px] text-left 
        text-[22px] text-[#131212] font-bold leading-[150%] pb-[16px] mb-[16px]">
          관심 분야
      </label>

      <div className="flex flex-wrap align-center h-auto ml-[200px] mt-[16px] p-[20px]">
        <div className="flex flex-wrap gap-[20px] mr-[300px]">
          {tags.map((tag, index) => (
            <label
              key={index}
              className={`w-[176px] h-[32px] pt-[6px] pb-[6px] text-center text-[16px] 
                font-medium leading-[150%] tracking-[-0.5px] rounded-[4px] cursor-pointer 
                ${selectedTags.includes(tag)
                  ? "bg-[#007AFF] text-white"
                  : "bg-[#F4F4F4] text-[#606166]"}
              `}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </label>
          ))}
        </div>
      </div>

      <p className="pl-[100px] pr-[120px] w-[1280px] h-[24px] text-left text-[#606166] 
        text-[16px] font-medium leading-[150%] tracking-[-0.5px] mt-[16px] mb-[40px]">
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
  const [sessions, setSessions] = useState([]); // allSessions -> sessions로 통합
  // 이미지 로딩 상태를 저장하는 state 추가
  const [imageLoadStatus, setImageLoadStatus] = useState({});

  useEffect(() => {
    fetchMySchedule();
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
        // 시간 오름차순으로 정렬
        const sortedSessions = response.data.response.sort((a, b) =>
          a.startTime.localeCompare(b.startTime)
        );
        setSessions(sortedSessions);
      } else {
        handleErrorResponse(response.data);
      }
    } catch (error) {
      console.error('API Error:', error);
      handleErrorResponse(error.response?.data);
    }
  }
    
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

  const fixedTimes = [
    "10:00\n~\n10:50",
    "11:05\n~\n11:55",
    "13:30\n~\n14:20",
    "14:35\n~\n15:25",
    "15:40\n~\n16:30",
    "16:40\n~\n17:30",
  ];

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
                    src="/images/chevron-left.png"
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
              나의 시간표
            </h2>

            {fixedTimes.map((time, index) => (
              <div key={index} className="flex items-start space-x-[20px] pl-[40px] mb-4">
                {/* 시간 블록 */}
                <div className="flex-shrink-0 w-[100px] h-[288px] bg-white flex flex-col justify-center items-center text-black text-[22px] font-medium border border-black">
                  <div className="whitespace-pre-line text-center">{time}</div>
                </div>

                {/* 세션 블록들 (최대 5개) */}
                {sessions.slice(index * 5, index * 5 + 5).map((session) => (
                  <div key={session.sessionId} className="flex-shrink-0">
                    <div className={`flex flex-col w-[240px] h-[288px] border border-[#CCCDD2] 
                      ${session.isMySchedule 
                        ? 'opacity-100' 
                        : 'opacity-50 border-t-[#CCCDD2]'}`}> 
                      <div className="w-[240px] h-[8px] bg-[#CCCDD2]" />
                      <div className="w-[216px] min-h-[60px] px-[12px] mb-[18px] text-black text-[18px] font-medium pt-[20px]">
                        {session.title}
                      </div>
                      <div className="w-full px-[12px] pb-[20px] text-[#85878D] text-[16px] font-medium">
                        {session.speakerName}
                      </div>
                      {imageLoadStatus[session.sessionId] === 'loading' && <div>Loading...</div>}
                      {imageLoadStatus[session.sessionId] === 'error' && <div>Error loading image</div>}
                      <img
                        src={session.speakerImage}
                        alt={`${session.title} 이미지`}
                        className="w-full h-[120px] h-full object-cover"
                        onLoad={() => handleImageLoad(session.sessionId)}
                        onError={() => handleImageError(session.sessionId)}
                        style={{ display: imageLoadStatus[session.sessionId] === 'loaded' ? 'block' : 'none' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {sessions.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                등록된 세션이 없습니다
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Mypage;