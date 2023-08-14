const women = [
    "Anjali", "Aditi", "Aaradhya", "Aishwarya", "Amrita", "Avantika", "Bhavana",
    "Chitra", "Deepika", "Divya", "Esha", "Farah", "Gargi", "Gayatri", "Hema",
    "Indira", "Ishani", "Jyoti", "Kamala", "Kavya", "Lakshmi", "Madhavi", "Meera",
    "Neha", "Nisha", "Ojaswini", "Pallavi", "Parvati", "Pooja", "Priya", "Radha",
    "Raksha", "Rekha", "Rina", "Rita", "Sarika", "Shalini", "Shreya", "Shubha",
    "Sita", "Sonal", "Sunita", "Tanvi", "Trisha", "Uma", "Usha", "Vaishnavi",
    "Vandana", "Vidya", "Yamini", "Zara", "Anita", "Anjana", "Bhavna", "Chandini",
    "Charulata", "Deepti", "Geeta", "Hema", "Isha", "Jayanti", "Kajal", "Kalpana",
    "Karuna", "Kavita", "Leela", "Malini", "Mamta", "Manju", "Mitali", "Mohini",
    "Nalini", "Namita", "Neeta", "Nirmala", "Padma", "Poonam", "Priyanka", "Rachana",
    "Ranjana", "Rashmi", "Rita", "Sangeeta", "Sapna", "Shashi", "Shikha", "Shilpa",
    "Smita", "Sushma", "Swati", "Urmila", "Vandana", "Vidya", "Vinita", "Vrinda",
    "Yamini"
  ];

const men = [
    "Apoorva", "Chandan", "Dhruv", "Yash", "Swami", "Mrinal", "Ganesh", "Gaurang",
    "Sabari", "Vicky", "Kaushal", "Sanidhya", "Dwij", "Aman", "April", "Rahul",
    "Amit", "Sandeep", "Rajesh", "Rohan", "Kunal", "Aditya", "Ravi", "Nikhil", "Vinay",
    "Rakesh", "Vikram", "Manish", "Alok", "Arun", "Ankur", "Harsh", "Sachin", "Nitin",
    "Rajendra", "Prakash", "Ramesh", "Mahesh", "Vijay", "Sunil", "Kamal", "Pradeep",
    "Gopal", "Vikas", "Dinesh", "Amar", "Jitendra", "Naresh", "Sanjay", "Subhash",
    "Arvind", "Rajeev", "Saurabh", "Vivek", "Sudhir", "Rajat", "Amitabh", "Sushant",
    "Ajit", "Shashank", "Utkarsh", "Varun", "Abhinav", "Akshay", "Ankit", "Arunabh",
    "Ashish", "Bhavesh", "Chaitanya", "Darshan", "Devendra", "Dhiraj", "Himanshu",
    "Jayesh", "Kailash", "Kalpesh", "Krishna", "Lalit", "Madhav", "Mayank", "Mukesh",
    "Naveen", "Niraj", "Nitesh", "Pankaj", "Parag", "Parth", "Pranav", "Pritesh",
    "Rishabh", "Ritesh", "Rushi", "Sagar", "Sarvesh", "Satish", "Shekhar", "Shreyas",
    "Siddharth", "Sourabh", "Swapnil", "Swaroop", "Tarun", "Tejas", "Vibhav", "Vinay",
    "Vishal"
  ];

export const randomName = (gender) => {
    if (gender === "f") {
        return women[Math.floor(Math.random()*women.length)];
    }
    return men[Math.floor(Math.random()*men.length)];
}

