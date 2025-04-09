const Menuitems = [
    
  {
      icon: '/Sidebar/dashboard.png',
      label: "Dashboard",
      href: "/",
  },
  {
    icon: '/Sidebar/patient.png',
    label: "Branch",
    href: "/branch",
  },
  {
     icon: "/Sidebar/service.png",
     label: "Department",
     href: "/department",
    },
    {
      icon: "/Sidebar/medical-appointment.png",
      label: "Doctor",
      href: "/doctor/all-doctor", 
      item : [
        {
           label: "All Doctor",
           href: "/doctor/all-doctor"
        },
        {
           label: "Shift Management",
           href:'/doctor/shift-management'
        }
      
      ]
    },
    {
      icon: "/Sidebar/doctor.png",
      label: "Staff",
      href: "/staff",
    },
    {
      icon: "/Sidebar/medical-appointment.png",
      label: "Patients",
      href: "/patients/allpatients", 
      item : [
        {
           label: "All Patients",
           href: "/patients/allpatients"
        },
        {
           label: "Patients Records",
           href:'/patients/patientsrecords'
        }
      ]
    },
    {
      icon: "/Sidebar/experiment-results.png",
      label: "Appointment",
      href: "/appointment",
    },
    {
      icon: "/Sidebar/experiment-results.png",
      label: "Laboratory",
      href: "/laboratory",
      item : [
        {
           label: "All Laboratory",
           href: "/laboratory/all-labs"
        },
        {
           label: "Lab Test",
           href:'/laboratory/lab-test'
        }
      ]
    },
    {
      icon: "/Sidebar/accounting.png",
      label: "Finance",
      href: "/finance/income",
      item : [



        {
          label: "Income",
          href: "/finance/income"
       },
       {
          label: "Expense",
          href:'/finance/expense'
       }
     ]
   },


  ]





export default Menuitems;