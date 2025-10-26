import { clerkClient } from '@clerk/express'

// Update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    // ✅ New Clerk syntax
    const { userId } = req.auth()

    // ✅ Check if userId exists
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No user ID found',
      })
    }

    // ✅ Update the public metadata for the user
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'educator',
      },
    })

    // ✅ Success response
    res.json({
      success: true,
      message: 'You can publish a course now',
    })
  } catch (error) {
    console.error('Error updating role:', error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
