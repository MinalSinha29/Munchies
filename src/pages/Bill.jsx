// src/pages/Bill.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Bill() {
  const { id } = useParams();              // order id
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/auth"); return; }

    (async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrder(data);
      } catch (err) {
        alert("Couldn't load bill."); 
        navigate("/my-orders");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  if (loading) return <p style={{color:"#fff", textAlign:"center", marginTop:24}}>Loading bill…</p>;
  if (!order) return null;

  return (
    <div style={{ maxWidth: 800, margin: "24px auto", padding: 20, color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>🧾 Invoice</h2>
        <div>
          <button
            onClick={() => window.print()}
            style={{ marginRight: 12, padding: "8px 12px", borderRadius: 8, border: "none", background: "#ffb703", color: "#000", fontWeight: 600 }}
          >
            Print / Save PDF
          </button>
          <Link to="/my-orders" style={{ color: "#ffb703", textDecoration: "none" }}>Back to My Orders</Link>
        </div>
      </div>

      <div style={{ background:"#151824", borderRadius:12, padding:16, marginTop:12, border:"1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontWeight:700, fontSize:18 }}>M&M Munchies</div>
            <div style={{ color:"#bbb", fontSize:13 }}>Mumbai • Pune • Delhi • Bangalore</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div><b>Invoice No:</b> {order.invoiceNo}</div>
            <div><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</div>
          </div>
        </div>

        <hr style={{ borderColor:"rgba(255,255,255,0.12)", margin:"12px 0" }} />

        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <div>
            <div style={{ fontWeight:700, marginBottom:4 }}>Bill To</div>
            <div>{order.user?.name || "Guest"}</div>
            <div style={{ color:"#bbb", fontSize:13 }}>{order.user?.email}</div>
            <div style={{ color:"#bbb", fontSize:13 }}>{order.user?.address}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div><b>Payment:</b> {order.paymentMethod}</div>
            <div><b>Status:</b> {order.status}</div>
          </div>
        </div>

        <table style={{ width:"100%", borderCollapse:"collapse", marginTop:8 }}>
          <thead>
            <tr style={{ background:"rgba(255,255,255,0.06)" }}>
              <th style={th}>Item</th>
              <th style={th}>Qty</th>
              <th style={th}>Price</th>
              <th style={th}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it, idx) => (
              <tr key={idx}>
                <td style={td}>{it.name}</td>
                <td style={td}>{it.qty}</td>
                <td style={td}>₹{it.price}</td>
                <td style={td}>₹{it.price * it.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display:"grid", gap:6, width:260, marginLeft:"auto", marginTop:14 }}>
          <Row label="Subtotal" value={`₹${order.subtotal}`} />
          <Row label="Tax (5%)" value={`₹${order.tax}`} />
          <Row label="Delivery Fee" value={`₹${order.deliveryFee}`} />
          {order.discount > 0 && <Row label="Discount" value={`– ₹${order.discount}`} />}
          <Row label="Grand Total" value={`₹${order.total}`} bold />
        </div>
      </div>
    </div>
  );
}

const th = { textAlign:"left", padding:"10px 8px", borderBottom:"1px solid rgba(255,255,255,0.08)" };
const td = { padding:"10px 8px", borderBottom:"1px dashed rgba(255,255,255,0.08)" };

function Row({ label, value, bold }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", fontWeight: bold ? 700 : 500 }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
