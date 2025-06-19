import { Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from 'react';
import supabase from './supabaseClient';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { pdf } from '@react-pdf/renderer';
import CvPdf from './components/CvPdf';

const CVGenerator = () => {
  const [userID, setUserID] = useState(null);
  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setUserID(JSON.parse(storedUserID));
    } else {
      console.warn('userID not found in localStorage');
    }
  }, []);

   const [formData, setFormData] = useState({
    title: '', firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zip: '',
    experience: [], education: [], languages: [], skills: []
  });
//function that get data from form fields and save it in an object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSectionChange = (section, index, e) => {
    const newSection = [...formData[section]];
    newSection[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [section]: newSection });
  };

  const handleAddField = (section) => {
    const defaultFields = {
      experience: { employer: '', startDate: '', endDate: '', jobTitle: '', location: '', description: '' },
      education: { school: '', startDate: '', endDate: '', degree: '' },
      languages: { language: '', level: '' },
      skills: { skill: '' }
    };
    setFormData({
      ...formData,
      [section]: [...formData[section], defaultFields[section]]
    });
  };
  //PDF generation from formDate object
  const handleGeneratePDF = async () => {
    try {
      const blob = await pdf(<CvPdf data={formData} />).toBlob();
  
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cv.pdf';
      link.click();
      URL.revokeObjectURL(url);
      if(userID) {
        setUserID(userID);
        const fileName = `cv_${Date.now()}.pdf`;
        const filePath = `${userID}/${fileName}`; // store under user folder
        console.error('file path:', filePath);
        // Upload PDF to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('cv-pdfs')
          .upload(filePath, blob, {
            cacheControl: '3600',
            upsert: false,
            contentType: 'application/pdf'
          });
          console.log("Upload success:", uploadData);
        if (uploadError) {
          console.error('Upload error:', uploadError);
          return;
        }
        // Save path to database, filter by User id insuring that data will be save for correct person
       
       const { data: updateData, error: updateError } = await supabase
          .from('userInfo')
          .update({ path: filePath })
          .eq('userID', userID); 

        if (updateError) {
          console.error('DB update error:', updateError);
        } else {
          console.log('CV path updated successfully:', updateData);
        }
      }
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '', firstName: '', lastName: '', email: '', phone: '',
      address: '', city: '', zip: '', experience: [], education: [], languages: [], skills: []
    });
  };

  return (
    
      <Form>
        {/* User personal information section */}
        <Row>
          <Col xs={4}>
            <Form.Label>Title</Form.Label>
            <Form.Select name="title" onChange={handleChange} defaultValue="">
              <option value="">Title</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
            </Form.Select>
          </Col>
          <Col xs={8}><Form.Label>First Name</Form.Label><Form.Control name="firstName" placeholder="" onChange={handleChange} /></Col>
        </Row>
        <Form.Label className="mt-2">Last Name</Form.Label>
        <Form.Control className="my-2" name="lastName" placeholder="" onChange={handleChange} />
        <Form.Label className="mt-2">Email</Form.Label>
        <Form.Control className="my-2" type="email" name="email" placeholder="" onChange={handleChange} />
        <Form.Label className="mt-2">Phone</Form.Label>
        <Form.Control className="my-2" type="tel" name="phone" placeholder="" onChange={handleChange} />
        <Form.Label className="mt-2">Address</Form.Label>
        <Form.Control className="my-2" name="address" placeholder="" onChange={handleChange} />

        <Row>
          <Col xs={8}><Form.Label>City</Form.Label><Form.Control name="city" placeholder="" onChange={handleChange} /></Col>
          <Col xs={4}><Form.Label>Zip</Form.Label><Form.Control name="zip" placeholder="" onChange={handleChange} /></Col>
        </Row>

        {/* Experience Section */}
        <div className="my-3">
          <h6>Experience</h6>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-3 border p-2 rounded">
              <Form.Label>Employer</Form.Label>
              <Form.Control name="employer" placeholder="" onChange={(e) => handleSectionChange('experience', index, e)} />
              <Form.Label>Job Title</Form.Label>
              <Form.Control name="jobTitle" placeholder="" onChange={(e) => handleSectionChange('experience', index, e)} />
              <Form.Label>Location</Form.Label>
              <Form.Control name="location" placeholder="" onChange={(e) => handleSectionChange('experience', index, e)} />
              <Row>
                <Col>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="month" name="startDate" placeholder="" onChange={(e) => handleSectionChange('experience', index, e)} />
                </Col>   
                <Col>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="month" name="endDate" placeholder="" onChange={(e) => handleSectionChange('experience', index, e)} />
                </Col>   
              </Row>  
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" placeholder="" onChange={(e) => handleSectionChange('experience', index, e)} />
            </div>
          ))}
          <div class="text-center"><Button variant="flat" size="sm" className="btn" onClick={() => handleAddField('experience')}><AddCircleIcon sx={{ fontSize: 48, color: '#062D75'}}/></Button></div>
          
        </div>

        {/* Education Section */}
        <div className="my-3">
          <h6>Education</h6>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-3 border p-2 rounded">
              <Form.Label>School</Form.Label>
              <Form.Control name="school" placeholder="" onChange={(e) => handleSectionChange('education', index, e)} />
              <Form.Label>Qualification/ Degree</Form.Label>
              <Form.Control name="degree" placeholder="" onChange={(e) => handleSectionChange('education', index, e)} />
              <Row>
                <Col>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="month" name="startDate" placeholder="" onChange={(e) => handleSectionChange('education', index, e)} />
                </Col>   
                <Col>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="month" name="endDate" placeholder="" onChange={(e) => handleSectionChange('education', index, e)} />
                </Col>   
              </Row>    
            </div>
          ))}
          <div class="text-center"><Button variant="flat" size="sm" className="btn" onClick={() => handleAddField('education')}><AddCircleIcon sx={{ fontSize: 48, color: '#062D75'}}/></Button></div>
          
        </div>

        {/* Languages Section */}
        <div className="my-3">
          <h6>Languages</h6>
          {formData.languages.map((lang, index) => (
            <div key={index} className="mb-3 border p-2 rounded">
              <Row>
                  <Col>
                    <Form.Label>Language</Form.Label>
                    <Form.Control name="language" placeholder="" onChange={(e) => handleSectionChange('languages', index, e)} />
                  </Col>   
                  <Col>
                    <Form.Label>Level</Form.Label>
                    <Form.Control name="level" placeholder="" onChange={(e) => handleSectionChange('languages', index, e)} />
                  </Col>   
              </Row>    
            </div>
          ))}
          <div class="text-center"><Button variant="flat" size="sm" className="btn" onClick={() => handleAddField('languages')}><AddCircleIcon sx={{ fontSize: 48, color: '#062D75'}}/></Button></div>
        </div>

        {/* Skills Section */}
        <div className="my-3">
          <h6>Skills</h6>
          {formData.skills.map((skill, index) => (
            <div key={index} className="mb-3 border p-2 rounded">
              <Form.Label>Skill</Form.Label>
              <Form.Control name="skill" placeholder="" onChange={(e) => handleSectionChange('skills', index, e)} />
            </div>
          ))}
          <div class="text-center"><Button variant="flat" size="sm" className="btn" onClick={() => handleAddField('skills')}><AddCircleIcon sx={{ fontSize: 48, color: '#062D75'}}/></Button></div>
        </div>

        <div className="d-flex justify-content-between">
          <Button variant="primary" onClick={handleGeneratePDF}>Generate PDF</Button>
         
        </div>
      </Form>
  );
};

export default CVGenerator;