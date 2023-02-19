export default function handler(req, res) {
    const body = req.body

    if (!body.date || !body.pickup) {
	return res.status(400).json({data: "first or last name not found"})
    }

    res.status(200).json({data:'${body.date} ${body.pickup}' })
}
