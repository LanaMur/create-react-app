// components/CvPdf.js
import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import uIcon from '../img/icons/circle-user-solid.png';
import phoneIcon from '../img/icons/phone-solid.png';
import mailIcon from '../img/icons/envelope-solid.png';
import gearsIcon from '../img/icons/gearsWH.png';
import globeIcon from '../img/icons/globeWH.png';
import eduIcon from '../img/icons/graduation-capWH.png';
import locationIcon from '../img/icons/location-dot-solid.png';
import workIcon from '../img/icons/briefcase-solid.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  leftColumn: {
    width: '60%',
    padding: 25,
    textAlign: 'left',
    paddingTop: 45,
    backgroundColor: '#fff',
  },
  rightColumn: {
    width: '40%',
    padding: 25,
    paddingTop: 65,
    textAlign: 'left',
    backgroundColor: '#3F5ACA',
    color: '#fff',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    marginTop: 25,
    textAlign: 'left',
    borderBottom: '1px solid #3F5ACA'
  },
  sectionTitleRight: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    marginTop: 25,
    textAlign: 'left',
    borderBottom: '1px solid #ffffff'
  },
  sectionExp: {
    marginBottom: 25,
  },
  sectionEdu: {
    marginBottom: 25,
  },
  skillBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 4,
    marginTop: 2,
  },
});

const CvPdf = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* LEFT COLUMN */}
      <View style={styles.leftColumn}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{data.title} {data.firstName} {data.lastName}</Text>
        <Text>{data.profession}</Text>
            <Text style={styles.sectionTitle}>
            <View style={{  marginBottom: 10 }}>
                 <Image src={uIcon} style={{ width: 35, height: 20 }} />
            </View> CONTACT ME</Text>
        <Text>
            <View style={{ marginBottom: 25 }}>
                 <Image src={phoneIcon} style={{ width: 40 }} />
            </View>{data.phone}
        </Text>
        <Text>
        <View style={{ marginBottom: 25 }}>
                 <Image src={mailIcon} style={{ width: 40 }} />
            </View>
            {data.email}</Text>
        <Text>
        <View style={{ marginBottom: 20 }}>
                 <Image src={locationIcon} style={{ width: 40 }} />
            </View>
            {data.address}, {data.zip} {data.city}</Text>

        <Text style={styles.sectionTitle} >
            <View style={{ marginBottom: 10 }}>
                 <Image src={workIcon} style={{ width: 40, height: 20 }} />
            </View>
            JOB EXPERIENCE</Text>
        {data.experience.map((exp, i) => (
          <View style={styles.sectionExp}  key={i}>
            <Text style={{ fontWeight: 'bold', color: '#3F5ACA', marginBottom: 5 }}>{exp.startDate} - {exp.endDate} <Text style={{ textTransform: 'uppercase', color: '#000000'}}>{exp.jobTitle}</Text></Text>
            <Text style={{ marginBottom: 5, marginLeft: 60 }}>{exp.employer} <Text style={{ color: '#3F5ACA' }}>/</Text> {exp.location}</Text>
            <Text style={{ marginLeft: 60}}>{exp.description}</Text>
          </View>
        ))}       
      </View>

      {/* RIGHT COLUMN */}
      <View style={styles.rightColumn}>
      <Text style={styles.sectionTitleRight}>
        <View style={{ alignItems: 'left', marginBottom: 10 }}>
                 <Image src={eduIcon} style={{ width: 30, height: 25 }} />
            </View>
            EDUCATION</Text>
        {data.education.map((edu, i) => (
          <View style={styles.sectionEdu} key={i}>
            <Text style={{ fontWeight: 'bold', color: '#000000', marginBottom: 5 }}>{edu.startDate} - {edu.endDate} <Text style={{ textTransform: 'uppercase'}}>{edu.school}</Text></Text>
            <Text style={{ marginLeft: 60}}>{edu.degree}</Text>
            
          </View>
        ))}
      <Text style={styles.sectionTitleRight}>
         <View style={{ alignItems: 'left', marginBottom: 10 }}>
                 <Image src={globeIcon} style={{ width: 30, height: 20 }} />
            </View>
            LANGUAGES</Text>
        <View>
          {data.languages.map((lang, i) => (
          <View key={i}>
            <Text>{lang.language} - <Text style={{ fontWeight: 'bold' }}>{lang.level}</Text></Text>
          </View>
          ))}
        </View>
        <Text style={styles.sectionTitleRight}>
        <View style={{ alignItems: 'left', marginBottom: 10 }}>
                 <Image src={gearsIcon} style={{ width: 30, height: 25 }} />
            </View>
            SKILLS</Text>
        {data.skills.map((skill, i) => (
          <View key={i}>
            <Text>{skill.skill}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default CvPdf;
