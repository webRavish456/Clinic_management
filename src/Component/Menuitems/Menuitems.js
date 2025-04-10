const Menuitems = [
    
  {
      icon: '/Sidebar/dashboard.png',
      label: "Dashboard",
      href: "/dashboard",
  },
  {
    icon: '/Sidebar/branch.png',
    label: "Branch",
    href: "/branch",
  },
  {
     icon: "/Sidebar/department.png",
     label: "Department",
     href: "/department",
    },
    {
      icon: "/Sidebar/doctor.png",
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
      icon: "/Sidebar/staff.png",
      label: "Staff",
      href: "/staff",
    },
    {
      icon: "/Sidebar/patient.png",
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
      icon: "/Sidebar/medical-appointment.png",
      label: "Appointment",
      href: "/appointment",
    },
    {
      icon: "/Sidebar/experiment-results.png",
      label: "Laboratory",
      href: "/laboratory/alllab",
      item : [
        {
           label: "All Lab",
           href: "/laboratory/alllab"
        },
        {
           label: "Lab Test",
           href:'/laboratory/labtest'
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