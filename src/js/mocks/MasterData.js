const masterData = {
    "projects": [
        {"name":"SAP UX Design","id":"PR567890","hiring_manager":"HM_8790HIJLKP","status":"staffed","type":"project"},
        {"name":"SAP UI Development","id":"PR567892","hiring_manager":"HM_8790HIJLKP","status":"hiring","type":"project"},
        {"name":"Hybris Mobility","id":"PR567893","hiring_manager":"HM_8790HIJLKP","status":"hiring","type":"project"},
        {"name":"Unicore Machines","id":"PR567894","hiring_manager":"HM_8790HIJLKP","status":"hiring","type":"project"},
        {"name":"Unicore Machines","id":"PR567895","hiring_manager":"HM_8790HIJLKP","status":"new","type":"project"},
        {"name":"Single Malt Breweries","id":"PR567896","hiring_manager":"HM_8790HIJLKP","status":"new","type":"project"},
        {"name":"Rising Aviation","id":"PR567897","hiring_manager":"HM_8790HIJLKP","status":"staffed","type":"project"}
    ],
    "candidates": [
        {"id":"C7689039","requestId":"RMS00101","name":"John Adams","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"90 days","skills":["java","oracle","angular","react"],"type":"candidate","status":"available"},
        {"id":"C7689040","requestId":"RMS00104","name":"Justin Baker","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"60 days","skills":["java","oracle"],"type":"candidate","status":"available"},
        {"id":"C7689041","requestId":"RMS00108","name":"Tom Jones","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"90 days","skills":["angular","react"],"type":"candidate","status":"staffed"},
        {"id":"C7689042","requestId":"RMS00105","name":"Hank Andrew","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"90 days","skills":["oracle","angular"],"type":"candidate","status":"available"},
        {"id":"C7689043","requestId":"RMS00101","name":"Jay Shawn","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"90 days","skills":["java","oracle","angular","react"],"type":"candidate","status":"available"},
        {"id":"C7689044","requestId":"RMS00123","name":"Hank Adams","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"90 days","skills":["cloud","wordpress","blogging"],"type":"candidate","status":"available"},
        {"id":"C7689045","requestId":"RMS00105","name":"Adam Jones","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"90 days","skills":["wordpress"],"type":"candidate","status":"available"},
        {"id":"C7689046","requestId":"RMS00101","name":"John Doe","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"90 days","skills":["aws"],"type":"candidate","status":"available"},
        {"id":"C7689047","requestId":"RMS00123","name":"Doe Jones","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"45 days","skills":["python"],"type":"candidate","status":"staffed"},
        {"id":"C7689048","requestId":"RMS00105","name":"Crawford James","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"45 days","skills":["python","oracle","angular","react"],"type":"candidate","status":"staffed"},
        {"id":"C7689049","requestId":"RMS00123","name":"Arnold Stallone","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"90 days","skills":["sap","siebel"],"type":"candidate","status":"staffed"},
        {"id":"C7689050","requestId":"RMS00117","name":"Sylvester","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"90 days","skills":["salesforce","siebel"],"type":"candidate","status":"staffed"},
        {"id":"C7689051","requestId":"RMS00118","name":"Donald Grind","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"15 days","skills":["administration"],"type":"candidate","status":"staffed"},
        {"id":"C7689052","requestId":"RMS00118","name":"Richard Wayne","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"30 days","skills":["java"],"type":"candidate","status":"staffed"},
        {"id":"C7689053","requestId":"RMS00117","name":"Shawn Richard","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"90 days","skills":["powershell","angular","react"],"type":"candidate","status":"staffed"},
        {"id":"C7689054","requestId":"RMS00120","name":"James Johnson","age":"55","contact":"Rock Start Recruiting Agency","phone":"1005669885","notice":"90 days","skills":["react","powershell"],"type":"candidate","status":"staffed"}
    ],
    "requests": [
        {"id":"RMS00101","name":"Need resource","projectId":"PR567890","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"completed","skills":["java","react"],"type":"request"},
        {"id":"RMS00102","name":"Need resource","projectId":"PR567890","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"completed","skills":["oracle","blogging","sap"],"type":"request"},
        {"id":"RMS00103","name":"Need resource","projectId":"PR567890","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"completed","skills":["sap","siebel"],"type":"request"},
        
        {"id":"RMS00104","name":"Need resource","projectId":"PR567892","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"new","skills":["blogging","administration"],"type":"request"},
        {"id":"RMS00105","name":"Need resource","projectId":"PR567892","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"active","skills":["administration","salesforce"],"type":"request"},
        
        {"id":"RMS00106","name":"Need resource","projectId":"PR567893","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"new","skills":["cloud","angular"],"type":"request"},
        {"id":"RMS00107","name":"Need resource","projectId":"PR567893","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"new","skills":["blogging","python"],"type":"request"},
        {"id":"RMS00108","name":"Need resource","projectId":"PR567893","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"active","skills":["react","salesforce","siebel"],"type":"request"},
        {"id":"RMS00109","name":"Need resource","projectId":"PR567893","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"active","skills":["salesforce","python","wordpress"],"type":"request"},
        {"id":"RMS00110","name":"Need resource","projectId":"PR567893","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"completed","skills":["react","java"],"type":"request"},
        
        {"id":"RMS00111","name":"Need resource","projectId":"PR567894","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"new","skills":["react","java"],"type":"request"},
        {"id":"RMS00112","name":"Need resource","projectId":"PR567894","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"active","skills":["salesforce","python","wordpress"],"type":"request"},
        {"id":"RMS00113","name":"Need resource","projectId":"PR567894","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"active","skills":["administration","salesforce"],"type":"request"},
        {"id":"RMS00114","name":"Need resource","projectId":"PR567894","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"completed","skills":["salesforce","python","wordpress"],"type":"request"},
        
        {"id":"RMS00115","name":"Need resource","projectId":"PR567895","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"new","skills":["react","java"],"type":"request"},
        {"id":"RMS00116","name":"Need resource","projectId":"PR567895","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"new","skills":["powershell","angular","react"],"type":"request"},
        {"id":"RMS00117","name":"Need resource","projectId":"PR567895","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"new","skills":["administration","salesforce"],"type":"request"},
        {"id":"RMS00118","name":"Need resource","projectId":"PR567895","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"new","skills":["react","java"],"type":"request"},
        
        {"id":"RMS00119","name":"Need resource","projectId":"PR567896","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"new","skills":["angular","react"],"type":"request"},
        {"id":"RMS00120","name":"Need resource","projectId":"PR567896","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"new","skills":["angular","react"],"type":"request"},
        
        {"id":"RMS00121","name":"Need resource","projectId":"PR567897","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"completed","skills":["sap","siebel"],"type":"request"},
        {"id":"RMS00122","name":"Need resource","projectId":"PR567897","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"completed","skills":["salesforce","python","wordpress"],"type":"request"},
        {"id":"RMS00123","name":"Need resource","projectId":"PR567897","service_type":"Information Technology","hiring_manager":"HM_8790HIJLKP","status":"completed","skills":["java","oracle","angular","react"],"type":"request"}
    ],
    "reminders": [
        {"name":"Talk to Fabian about the new project","id":"RR567890","status":"active","type":"reminder"},
        {"name":"Pass the Service now developer JD to Archie.","id":"RR567892","status":"completed","type":"reminder"},
        {"name":"Meet up with the new candidates","id":"RR567893","status":"new","type":"reminder"},
        {"name":"Check out the new CVs","id":"RR567894","status":"active","type":"reminder"},
        {"name":"Send a thank you note to Lars","id":"RR567895","status":"completed","type":"reminder"},
        {"name":"Add OOO to Outlook before leaving tonight.","id":"RR567896","status":"active","type":"reminder"},
        {"name":"Take the junk to the shredder.","id":"RR567897","status":"new","type":"reminder"},
        {"name":"Think up of new prospects.","id":"RR667890","status":"active","type":"reminder"},
        {"name":"Take out Donald for a drink to discuss his requirements for the next season.","id":"RR667892","status":"completed","type":"reminder"},
        {"name":"Meet up with the new candidates","id":"RR667893","status":"new","type":"reminder"},
        {"name":"Check out the new coffee machine.","id":"RR667894","status":"completed","type":"reminder"},
        {"name":"Send a memo to accounts","id":"RR667895","status":"completed","type":"reminder"},
        {"name":"Add the auto mail sender account to Outlook.","id":"RR667896","status":"new","type":"reminder"},
        {"name":"Pick up Susan from school.","id":"RR667897","status":"active","type":"reminder"}
    ],
    "notifications": [
        {"name":"New staffing request for ServiceNow project.","id":"RR588880","status":"new","type":"reminder"},
        {"name":"Contact system admin for new password generation.","id":"RR5789890","status":"completed","type":"reminder"},
        {"name":"Your password will expire in 4 days!","id":"RR56721312","status":"active","type":"reminder"},
    ]
}

export default masterData;
