import { useEffect, useState } from 'react';
import supabase from './supabaseClient';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userSurname, setSurname] = useState(null);
  const [userPhone, setPhone] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (!storedUserID) {
      navigate('/login');
      return;
    }
    const parsedUserID = JSON.parse(storedUserID);
    setUserID(parsedUserID);
     // Check userInfo for CV PDF link
    const fetchUserInfo = async () => {
      const { data, error } = await supabase
        .from('userInfo')
        .select('*')
        .eq('userID', parsedUserID)
        .single();
        console.log("Fetched user info:", data);
        console.log("Parsed UserID:", parsedUserID);
        if (error || !data) {
          setMessage("Could not find your CV. " + parsedUserID);
          return;
        }
        setUserName(data.name);
        setSurname(data.surname);
        setPhone(data.phone);
    };

    fetchUserInfo();
  }, [navigate]);
  const handleDownloadPDF = async () => {
    
  if (!userID) {
    alert("User ID is missing");
    return;
  }

  // Fetch the path from the database
  const { data, error } = await supabase
    .from('userInfo')
    .select('path')
    .eq('userID', userID)
    .single();

  if (error || !data) {
    console.error('Error fetching PDF path:', error);
    alert("Could not find your saved CV.");
    return;
  }
//Generate URL from Supabase storage to download CV's PDF
  const filePath = data.path;
  const fileName = filePath.split('/').pop();
  const { data2, error2 } = await supabase.storage
  .from('bucket')
  .createSignedUrl(data.path, 3600)
  if (data2) {
    console.log(data2.signedUrl)
  }

  const downloadUrl = `https://bpalfgwfybdsnbpwhzin.supabase.co/storage/v1/object/public/cv-pdfs/${filePath}`;
  window.open(downloadUrl, '_blank');

};

  if (!userID) return null;
  

  return (
    <div>
      <h1>Dashboard</h1>
      {message}<br/>
      <b>Name:</b> {userName}<br/>
      Username: {userSurname}<br/>
      Phone: {userPhone}<br/>
      <br/>
      Download CV: <button onClick={handleDownloadPDF}>Download PDF</button><br/>
    </div>
  );
}

export default Dashboard;