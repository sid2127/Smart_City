import { json } from 'express';
import { db } from '../db/index.js';
import { UploadOnCloudinary } from '../utils/cloudinary.js';

//Create Complaint
const createComplaint = async (req, res) => {
  try {

    console.log("REQ USER:", req.user); 
    const { title, description, department, priority, address } = req.body;

    if (!title || !description || !department || !address) {
      return res.status(400).json({
        success: false,
        message: "All required fields missing"
      });
    }

    // get local file path from multer
    const localFilePath = req.file?.path;

    let image_url = null;

    // upload to cloudinary
    if (localFilePath) {
      try {
        const cloudinaryResponse = await UploadOnCloudinary(localFilePath);
        image_url = cloudinaryResponse?.secure_url;
      } catch (err) {
        console.log("Cloudinary error:", err);
      }
    }

    // 🔥 insert into DB
    const [result] = await db.query(
      `INSERT INTO complaints 
      (user_id, title, description, department, priority, address, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        title,
        description,
        department,
        priority || "medium",
        address,
        image_url || null
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Complaint created successfully",
      complaintId: result.insertId,
      image_url: image_url || null
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create complaint"
    });
  }
};

//Get All Complaints
const getComplaints = async (req, res) => {
  try {

    // USER
    if (req.user.role === "user") {
      const [rows] = await db.query(
        "SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC",
        [req.user.id]
      );

      return res.status(200).json({
        success: true,
        complaints: rows
      });
    }

    //OFFICER
    if (req.user.role === "officer") {
      const [rows] = await db.query(
        "SELECT * FROM complaints WHERE assigned_to = ? ORDER BY created_at DESC",
        [req.user.id]
      );

      return res.status(200).json({
        success: true,
        complaints: rows
      });
    }

    // ADMIN
    if (req.user.role === "admin") {

      // 🔹 Pending complaints
      const response = await db.query(
        "SELECT * FROM complaints WHERE status = 'pending' ORDER BY created_at DESC"
      );

      const pending = response[0];

      // 🔹 Assigned + in_progress 
      const response2 = await db.query(
        `SELECT 
         c.*,
        u.name AS officer_name,
        u.email AS officer_email
       FROM complaints c
       LEFT JOIN users u ON c.assigned_to = u.id
        WHERE c.status IN ('assigned', 'in_progress')
        ORDER BY c.created_at DESC`
      );

      const assignedComplainPending = response2[0];

      const response3 = await db.query(
        `SELECT 
         c.*,
         u.name AS officer_name,
         u.email AS officer_email
         FROM complaints c
         LEFT JOIN users u ON c.assigned_to = u.id
         WHERE c.status = 'resolved'
         ORDER BY c.created_at DESC`
      );

      const resolved = response3[0];

      return res.status(200).json({
        success: true,
        pendingComplaints: pending,
        assignedPendingComplaints: assignedComplainPending,
        completedComplaints: resolved
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch complaints"
    });
  }
};

//Assign Officer To the complain
const assignComplaint = async (req, res) => {
  try {
    const { complaintId, officerId } = req.params;

    if (!complaintId || !officerId) {
      return res.status(400).json({
        success: false,
        message: "ComplaintId and OfficerId required"
      });
    }

    // 🔹 assign officer + change status
    const response = await db.query(
      `UPDATE complaints 
       SET assigned_to = ?, status = 'assigned'
       WHERE id = ?`,
      [officerId, complaintId]
    );

    const result = response[0];

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    return res.json({
      success: true,
      message: "Complaint assigned successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to assign complaint"
    });
  }
};

//Update Status of Complaint
const updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId, status } = req.params;

    if (!complaintId || !status) {
      return res.status(400).json({
        success: false,
        message: "ComplaintId and status required"
      });
    }

    const response = await db.query(
      `UPDATE complaints 
       SET status = ? 
       WHERE id = ? AND assigned_to = ?`,
      [status, complaintId, req.user.id]
    );

    const result = response[0];

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found or not assigned to you"
      });
    }

    return res.json({
      success: true,
      message: "Status updated successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update status"
    });
  }
};


//getAll Officers From Each Department
const getOfficersGrouped = async (req, res) => {
  try {

    // 🔹 get all officers
    const response = await db.query(
      `SELECT id, name, email, department 
       FROM users 
       WHERE role = 'officer'`
    );

    const officers = response[0];

    // 🔹 group by department
    const grouped = {
      water: [],
      electricity: [],
      road: [],
      sanitation: [],
      public_safety: []
    };

    officers.forEach((officer) => {
      if (grouped[officer.department]) {
        grouped[officer.department].push(officer);
      }
    });

    return res.json({
      success: true,
      officers: grouped
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch officers"
    });
  }
};

//Delete complaint

const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Complaint ID is required"
      });
    }

    // 🔹 delete query
    const response = await db.query(
      "DELETE FROM complaints WHERE id = ?",
      [id]
    );

    const result = response[0];

    // 🔹 check if complaint existed
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    return res.json({
      success: true,
      message: "Complaint deleted successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete complaint"
    });
  }
};

//getComplaint By Id

const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Complaint ID is required"
      });
    }

    const response = await db.query(
      `SELECT * FROM complaints WHERE id = ?`,
      [id]
    );

    const complaint = response[0];

    if (complaint.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No complaint found"
      });
    }

    return res.status(200).json({
      success: true,
      complaint: complaint[0]
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching complaint"
    });
  }
};


export { getComplaints, createComplaint, assignComplaint, updateComplaintStatus, getOfficersGrouped, deleteComplaint, getComplaintById };
