"use client";
export default function ContactPage() {
    const fakeContacts = [
        {
            name: "John Doe",
            role: "Customer Support",
            email: "support@buyio.com",
            phone: "+41 44 123 4567",
        },
        {
            name: "Jane Smith",
            role: "Sales Manager",
            email: "sales@buyio.com",
            phone: "+41 44 987 6543",
        },
        {
            name: "Ali Khan",
            role: "Technical Lead",
            email: "tech@buyio.com",
            phone: "+41 44 555 1122",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
            <p className="mb-4 text-gray-600">
                Have questions about Buyio? Reach out to our team below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fakeContacts.map((contact, idx) => (
                    <div key={idx} className="border rounded p-4 shadow">
                        <h2 className="text-lg font-semibold">{contact.name}</h2>
                        <p className="text-sm text-gray-500">{contact.role}</p>
                        <p className="mt-2 text-sm">📧 {contact.email}</p>
                        <p className="text-sm">📞 {contact.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
