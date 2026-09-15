import React from "react";
import Icon from "./Icons.jsx";

function BrowserBar({ address }) {
  return (
    <div className="browser-bar">
      <span className="browser-dots">
        <i />
        <i />
        <i />
      </span>
      <span>{address}</span>
      <Icon name="globe" size={10} />
    </div>
  );
}

export function CrmPreview() {
  return (
    <div className="project-visual crm-visual" aria-hidden="true">
      <div className="visual-grid" />
      <span className="visual-index">01 / INTELLIGENT BUSINESS</span>
      <div className="mini-browser crm-browser">
        <BrowserBar address="Skyline · Your sales, in perspective" />
        <div className="crm-layout">
          <aside className="crm-sidebar">
            <div className="mini-logo">
              <Icon name="layers" size={16} /> skyline<span>®</span>
            </div>
            <span className="mini-menu active">▦ &nbsp; Overview</span>
            <span className="mini-menu">⌁ &nbsp; Pipeline</span>
            <span className="mini-menu">◉ &nbsp; Contacts</span>
            <span className="mini-menu">□ &nbsp; Tasks</span>
            <div className="sidebar-bottom">
              <span className="avatar">P</span> My workspace
            </div>
          </aside>
          <div className="crm-main">
            <div className="mini-topline">
              <span>Workspace / Overview</span>
              <span className="avatar">P</span>
            </div>
            <div className="mini-heading">
              <div>
                <h4>A clearer view of your growth.</h4>
                <p>Everything you need to move the next deal forward.</p>
              </div>
              <span className="mini-action">+ New lead</span>
            </div>
            <div className="mini-stats">
              <div>
                <small>Total revenue</small>
                <strong>₹84,250</strong>
                <em>↗ 12.8%</em>
              </div>
              <div>
                <small>Active leads</small>
                <strong>248</strong>
                <em>↗ 8.2%</em>
              </div>
              <div>
                <small>Deals won</small>
                <strong>32</strong>
                <em>↗ 16.4%</em>
              </div>
            </div>
            <div className="mini-chart">
              <div>
                <strong>Revenue overview</strong>
                <span>This month⌄</span>
              </div>
              <svg viewBox="0 0 360 104" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#b9db84" stopOpacity=".5" />
                    <stop offset="1" stopColor="#b9db84" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 24H360M0 52H360M0 80H360" stroke="#edf0e9" />
                <path
                  d="M0 89C20 87 25 60 45 64S70 91 94 63s28 10 56-18 35 23 63-3 35 16 66-8 50 10 81-25V104H0Z"
                  fill="url(#chart-fill)"
                />
                <path
                  d="M0 89C20 87 25 60 45 64S70 91 94 63s28 10 56-18 35 23 63-3 35 16 66-8 50 10 81-25"
                  stroke="#65934d"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>
              <div className="chart-labels">
                <span>01 Jun</span>
                <span>07 Jun</span>
                <span>14 Jun</span>
                <span>21 Jun</span>
                <span>28 Jun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ai-float">
        <span className="ai-float-icon">
          <Icon name="spark" size={17} />
        </span>
        <div>
          <strong>A little intelligence. A big advantage.</strong>
          <small>AI-powered summaries & sales insights</small>
        </div>
      </div>
      <span className="visual-caption">
        INTERFACE CONCEPT · ILLUSTRATIVE DATA
      </span>
    </div>
  );
}

export function SupportPreview() {
  return (
    <div className="project-visual support-visual" aria-hidden="true">
      <div className="support-halo" />
      <span className="visual-index">02 / HUMAN-CENTRED AI</span>
      <div className="mini-browser support-browser">
        <BrowserBar address="Support workspace · Every conversation matters" />
        <div className="support-layout">
          <aside className="support-sidebar">
            <div className="mini-logo">
              <Icon name="spark" size={16} /> support<span>AI</span>
            </div>
            <span className="mini-menu active">
              ▣ &nbsp; Inbox <b>12</b>
            </span>
            <span className="mini-menu">◎ &nbsp; Assigned to me</span>
            <span className="mini-menu">✓ &nbsp; Resolved</span>
            <div className="support-label">CONVERSATIONS</div>
            <div className="ticket active">
              <span className="avatar">JD</span>
              <div>
                <b>Demo customer</b>
                <small>Help with my workspace</small>
              </div>
              <i />
            </div>
            <div className="ticket">
              <span className="avatar pink">AL</span>
              <div>
                <b>Demo team</b>
                <small>Account permissions</small>
              </div>
            </div>
            <div className="ticket">
              <span className="avatar beige">MK</span>
              <div>
                <b>Demo member</b>
                <small>Thanks for the quick help!</small>
              </div>
            </div>
          </aside>
          <div className="support-main">
            <div className="conversation-header">
              <div>
                <strong>Help with my workspace</strong>
                <span>#TK-2048 · Account support</span>
              </div>
              <span className="status-tag">Open</span>
            </div>
            <div className="conversation-date">TODAY, 10:42 AM</div>
            <div className="chat-message">
              Hi! How can I invite my team to our workspace?
            </div>
            <div className="ai-draft">
              <div>
                <Icon name="spark" size={13} />
                <strong>AI suggested response</strong>
                <span>Draft</span>
              </div>
              <p>
                You can invite your team from Settings → Members. Select “Invite
                member”, enter their email, and choose a role.
              </p>
              <span>Context-aware · Ready for your review</span>
            </div>
            <div className="reply-box">
              Write a reply…<span className="mini-action">Send reply ↗</span>
            </div>
          </div>
        </div>
      </div>
      <div className="support-float">
        <span className="float-check">
          <Icon name="check" size={15} />
        </span>
        <span>
          Less repetitive work.
          <br />
          <strong>More meaningful support.</strong>
        </span>
      </div>
      <span className="visual-caption">
        INTERFACE CONCEPT · ILLUSTRATIVE DATA
      </span>
    </div>
  );
}
