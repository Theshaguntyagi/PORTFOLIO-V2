import TCS from '../assets/certificates/TCS.png';
import AWS from '../assets/certificates/AWS.png';
import AZ900 from '../assets/certificates/AZURE.png';
import PL900 from '../assets/certificates/PL 900.png';
import CISCO from '../assets/certificates/Cybersecurity Essentials.png';
import python from '../assets/certificates/HACKERRANK PYTHON.png';
import sql from '../assets/certificates/HACKERANK SQL.png';
import networks from '../assets/certificates/int to networks.png';
import cisco from '../assets/certificates/cyberops associate.png';


export const certifications = [
  {
    id: "aws-cloud-foundation",
    title: "AWS Academy Cloud Foundations",
    subtitle: "Amazon Web Services",
    image: AWS,
    description: "Covers core AWS cloud concepts, services, security, architecture, pricing, and support.",
    description_hi: "कोर एडब्ल्यूएस क्लाउड अवधारणाओं, सेवाओं, सुरक्षा, वास्तुकला, मूल्य निर्धारण और समर्थन को शामिल करता है।",
    description_es: "Cubre los conceptos principales de la nube de AWS, servicios, seguridad, arquitectura, precios y soporte.",
    issuedBy: "Amazon Web Services",
    date: "Nov 30, 2022",
    link: "https://www.credly.com/badges/07fb33b4-bf07-4023-8b5e-8e0b6025c303/public_url"
  },
  {
    id: "azure-az900",
    title: "Microsoft Azure Fundamentals (AZ-900)",
    subtitle: "Microsoft",
    image: AZ900,
    description: "Covers cloud concepts, core Azure services, security, privacy, compliance, and pricing.",
    description_hi: "क्लाउड अवधारणाओं, कोर एज़्योर सेवाओं, सुरक्षा, गोपनीयता, अनुपालन और मूल्य निर्धारण को शामिल करता है।",
    description_es: "Cubre conceptos de la nube, servicios principales de Azure, seguridad, privacidad, cumplimiento y precios.",
    issuedBy: "Microsoft",
    date: "MAY 07, 2023",
    link: "https://www.credly.com/badges/00ed0357-44cc-4444-8977-e4aa66547f9a/public_url"
  },
  {
    id: "azure-pl900",
    title: "Microsoft Power Platform Fundamentals (PL-900)",
    subtitle: "Microsoft",
    image: PL900,
    description: "Covers Power BI, Power Apps, Power Automate, and Power Virtual Agents fundamentals.",
    description_hi: "पावर बीआई, पावर एप्स, पावर ऑटोमेट और पावर वर्चुअल एजेंट्स के बुनियादी सिद्धांतों को शामिल करता है।",
    description_es: "Cubre los fundamentos de Power BI, Power Apps, Power Automate y Power Virtual Agents.",
    issuedBy: "Microsoft",
    date: "May 07, 2023",
    link: "https://www.credly.com/badges/ffb7a3f7-f4bd-4553-9854-1bf7b8bb68a7/public_url"
  },
  {
    id: "cisco-cyberops",
    title: "CyberOps Associate",
    subtitle: "Cisco",
    image: cisco,
    description: "Covers security operations, threat analysis, incident response, and SOC workflows.",
    description_hi: "सुरक्षा संचालन, खतरे का विश्लेषण, घटना प्रतिक्रिया और एसओसी वर्कफ़्लो को शामिल करता है।",
    description_es: "Cubre operaciones de seguridad, análisis de amenazas, respuesta a incidentes y flujos de trabajo de SOC.",
    issuedBy: "Cisco",
    date: "Dec 18,2022",
    link: "https://www.credly.com/badges/710786e0-44a4-4205-b298-d1c5f2804dfe/linked_in_profile"
  },
  {
    id: "cisco-ccna",
    title: "CCNA: Introduction to Networks",
    subtitle: "Cisco",
    image: networks,
    description: "Covers networking fundamentals, IP addressing, routing, switching, and network protocols.",
    description_hi: "नेटवर्किंग के बुनियादी सिद्धांतों, आईपी एड्रेसिंग, रूटिंग, स्विचिंग और नेटवर्क प्रोटोकॉल को शामिल करता है।",
    description_es: "Cubre fundamentos de redes, direccionamiento IP, enrutamiento, conmutación y protocolos de red.",
    issuedBy: "Cisco",
    date: "Dec 18,2022",
    link: "https://www.credly.com/badges/5a9cb8fb-a749-48c8-a26a-d716a8843a5b/linked_in_profile"
  },
  {
    id: "cisco-cybersecurity",
    title: "Cybersecurity Essentials",
    subtitle: "Cisco",
    image: CISCO,
    description: "Covers cybersecurity principles, threat landscape, cryptography, and best practices.",
    description_hi: "साइबर सुरक्षा सिद्धांतों, खतरे के परिदृश्य, क्रिप्टोग्राफी और सर्वोत्तम प्रथाओं को शामिल करता है।",
    description_es: "Cubre principios de ciberseguridad, panorama de amenazas, criptografía y mejores prácticas.",
    issuedBy: "Cisco",
    date: "Oct 8, 2022",
    link: "https://www.credly.com/badges/fb686990-4cc6-4698-9fb4-cdddee807a50/linked_in_profile"
  },
  {
    id: "hackerrank-python",
    title: "Python Certification",
    subtitle: "HackerRank",
    image: python,
    description: "Validates proficiency in Python programming including data structures and problem solving.",
    description_hi: "डेटा संरचनाओं और समस्या समाधान सहित पायठन प्रोग्रामिंग में दक्षता को मान्य करता है।",
    description_es: "Valida la competencia en la programación de Python, incluyendo estructuras de datos y resolución de problemas.",
    issuedBy: "HackerRank",
    date: "Oct 8,2023",
    link: "https://www.hackerrank.com/certificates/3f1fdf0f3086"
  },
  {
    id: "hackerrank-sql",
    title: "SQL Certification",
    subtitle: "HackerRank",
    image: sql,
    description: "Validates proficiency in SQL queries, joins, aggregations, and database operations.",
    description_hi: "एसक्यूएल क्वेरी, जॉइन, एग्रीगेशन और डेटाबेस संचालन में दक्षता को मान्य करता है।",
    description_es: "Valida la competencia en consultas SQL, uniones (joins), agregaciones y operaciones de base de datos.",
    issuedBy: "HackerRank",
    date: "Dec 20, 2022",
    link: "https://www.hackerrank.com/certificates/47f2f011c4d7"
  },
  {
    id: "tcs-yep",
    title: "TCS Youth Employment Program",
    subtitle: "Tata Consultancy Services",
    image: TCS,
    description: "Industry-readiness program covering professional skills, technology fundamentals, and employability.",
    description_hi: "व्यावसायिक कौशल, प्रौद्योगिकी के बुनियादी सिद्धांतों और रोजगार क्षमता को कवर करने वाला उद्योग-तैयारी कार्यक्रम।",
    description_es: "Programa de preparación para la industria que cubre habilidades profesionales, fundamentos tecnológicos y empleabilidad.",
    issuedBy: "Tata Consultancy Services",
    date: "Dec 10,2023",
    link: "https://www.credly.com/badges/fb686990-4cc6-4698-9fb4-cdddee807a50/linked_in_profile"
  }
];