"use client";

import { useEffect, useState } from "react";
import {
  App,
  Avatar,
  Badge,
  Button,
  Card,
  ConfigProvider,
  Drawer,
  Flex,
  Layout,
  Menu,
  Progress,
  Segmented,
  Select,
  Space,
  Statistic,
  Switch,
  Table,
  Tag,
  Timeline,
  Tooltip,
  Typography,
  theme,
} from "antd";
import {
  AppstoreOutlined,
  BellOutlined,
  CalendarOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  DashboardOutlined,
  DownOutlined,
  EnvironmentOutlined,
  HistoryOutlined,
  MenuFoldOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  StopOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
type Sport = "Tennis" | "Badminton" | "Pickleball" | "Bowling";
const sports: {
  name: Sport;
  icon: string;
  resource: string;
  accent: string;
}[] = [
  { name: "Tennis", icon: "🎾", resource: "2 courts", accent: "#1677ff" },
  { name: "Badminton", icon: "🏸", resource: "3 courts", accent: "#7c3aed" },
  { name: "Pickleball", icon: "◉", resource: "2 courts", accent: "#ea580c" },
  { name: "Bowling", icon: "🎳", resource: "6 lanes", accent: "#0891b2" },
];
const days = [
  { day: "Today", date: "13", label: "Thu" },
  { day: "Tomorrow", date: "14", label: "Fri" },
  { day: "Saturday", date: "15", label: "Sat" },
  { day: "Sunday", date: "16", label: "Sun" },
  { day: "Monday", date: "17", label: "Mon" },
  { day: "Tuesday", date: "18", label: "Tue" },
  { day: "Wednesday", date: "19", label: "Wed" },
];
const times = [
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];
function state(d: number, t: number) {
  if (d === 2 && t === 5) return "mine";
  if ((d * 3 + t) % 7 === 0 || (d === 0 && t < 3)) return "reserved";
  if (d === 6 && t > 5) return "closed";
  return "available";
}

function Brand() {
  return (
    <div className="brand">
      <div className="crest">CE</div>
      <span>
        <strong>Casino Español</strong>
        <small>de Cebu, Inc.</small>
      </span>
    </div>
  );
}

function Booking() {
  const { message } = App.useApp();
  const [sport, setSport] = useState<Sport>("Tennis");
  const [resource, setResource] = useState("Court 1");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({ d: 2, t: 4 });
  const [done, setDone] = useState(false);
  const info = sports.find((s) => s.name === sport)!;
  const resources = Array.from(
    { length: sport === "Bowling" ? 6 : sport === "Badminton" ? 3 : 2 },
    (_, i) => ({
      label: `${sport === "Bowling" ? "Lane" : "Court"} ${i + 1}`,
      value: `${sport === "Bowling" ? "Lane" : "Court"} ${i + 1}`,
    }),
  );
  const choose = (d: number, t: number) => {
    setSelected({ d, t });
    setDone(false);
    setOpen(true);
  };
  const confirm = () => {
    setDone(true);
    message.success("Reservation confirmed. Your reminder is scheduled.");
  };
  return (
    <>
      <section className="heading">
        <div>
          <Text className="eyebrow">SPORTS RESERVATIONS</Text>
          <Title level={2}>Book a facility</Title>
          <Paragraph>
            Choose an available slot within the next seven days.
          </Paragraph>
        </div>
        <Space>
          <Button icon={<QuestionCircleOutlined />}>Booking rules</Button>
          <Button type="primary" icon={<CalendarOutlined />}>
            My reservations
          </Button>
        </Space>
      </section>
      <div className="sports">
        {sports.map((s) => (
          <button
            key={s.name}
            className={`sport ${sport === s.name ? "active" : ""}`}
            style={{ "--accent": s.accent } as React.CSSProperties}
            onClick={() => {
              setSport(s.name);
              setResource(s.name === "Bowling" ? "Lane 1" : "Court 1");
            }}
          >
            <b>{s.icon}</b>
            <span>
              <strong>{s.name}</strong>
              <small>{s.resource}</small>
            </span>
            {sport === s.name && <CheckCircleFilled />}
          </button>
        ))}
      </div>
      <Card className="availability" bordered={false}>
        <Flex justify="space-between" align="center" gap={12} wrap>
          <div>
            <Title level={4}>
              <i style={{ background: info.accent }} /> {sport} availability
            </Title>
            <Text type="secondary">August 13–19, 2026</Text>
          </div>
          <Space>
            <Select
              value={resource}
              onChange={setResource}
              options={resources}
              style={{ width: 130 }}
            />
            <Segmented options={["Grid", "List"]} />
          </Space>
        </Flex>
        <div className="legend">
          <span>
            <i className="a" />
            Available
          </span>
          <span>
            <i className="m" />
            Your reservation
          </span>
          <span>
            <i className="r" />
            Reserved
          </span>
          <span>
            <i className="c" />
            Closed
          </span>
        </div>
        <div className="scroll">
          <div className="schedule">
            <div className="time-head">
              <ClockCircleOutlined /> Time
            </div>
            {days.map((d, i) => (
              <div className={`day ${i === 0 ? "today" : ""}`} key={d.date}>
                <span>{d.label}</span>
                <strong>{d.date}</strong>
                <small>{d.day}</small>
              </div>
            ))}
            {times.map((time, t) => (
              <div className="row" key={time}>
                <div className="time">{time}</div>
                {days.map((_, d) => {
                  const x = state(d, t);
                  return (
                    <button
                      key={`${d}-${t}`}
                      disabled={x !== "available"}
                      className={`slot ${x}`}
                      onClick={() => choose(d, t)}
                    >
                      {x === "available" ? (
                        <>
                          <PlusOutlined /> Book
                        </>
                      ) : x === "mine" ? (
                        <>
                          <CheckCircleFilled /> Yours
                        </>
                      ) : (
                        x[0].toUpperCase() + x.slice(1)
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Drawer
        title={done ? "Reservation confirmed" : "Confirm reservation"}
        open={open}
        onClose={() => setOpen(false)}
        width={440}
        footer={
          !done ? (
            <Flex justify="end" gap={8}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="primary" onClick={confirm}>
                Confirm reservation
              </Button>
            </Flex>
          ) : (
            <Button block type="primary" onClick={() => setOpen(false)}>
              Done
            </Button>
          )
        }
      >
        {!done ? (
          <>
            <div className="summary">
              <b>{info.icon}</b>
              <span>
                <Text type="secondary">{sport}</Text>
                <Title level={3}>{resource}</Title>
              </span>
            </div>
            <div className="details">
              <div>
                <CalendarOutlined />
                <span>
                  <small>Date</small>
                  <strong>
                    {days[selected.d].day}, August {days[selected.d].date}, 2026
                  </strong>
                </span>
              </div>
              <div>
                <ClockCircleOutlined />
                <span>
                  <small>Time</small>
                  <strong>{times[selected.t]} · 1 hour</strong>
                </span>
              </div>
              <div>
                <EnvironmentOutlined />
                <span>
                  <small>Location</small>
                  <strong>Sports Pavilion, Level 2</strong>
                </span>
              </div>
              <div>
                <UserOutlined />
                <span>
                  <small>Member</small>
                  <strong>Demo Member · DEMO-0001</strong>
                </span>
              </div>
            </div>
            <Flex className="reminder" justify="space-between">
              <span>
                <strong>Push reminder</strong>
                <small>Notify me 1 hour before</small>
              </span>
              <Switch defaultChecked />
            </Flex>
          </>
        ) : (
          <div className="confirmed">
            <CheckCircleFilled />
            <Title level={3}>You’re all set!</Title>
            <Paragraph>
              Your {sport.toLowerCase()} reservation is confirmed.
            </Paragraph>
            <Card size="small">
              <strong>
                {days[selected.d].day}, August {days[selected.d].date}
              </strong>
              <br />
              {times[selected.t]} · {resource}
            </Card>
          </div>
        )}
      </Drawer>
    </>
  );
}

const rows = [
  {
    key: 1,
    member: "Member A · DEMO-0101",
    facility: "Tennis · Court 2",
    schedule: "Aug 14, 8:00 AM",
    status: "Confirmed",
  },
  {
    key: 2,
    member: "Member B · DEMO-0102",
    facility: "Bowling · Lane 4",
    schedule: "Aug 14, 3:00 PM",
    status: "Confirmed",
  },
  {
    key: 3,
    member: "Member C · DEMO-0103",
    facility: "Badminton · Court 1",
    schedule: "Aug 15, 9:00 AM",
    status: "Pending",
  },
  {
    key: 4,
    member: "Member D · DEMO-0104",
    facility: "Pickleball · Court 2",
    schedule: "Aug 15, 4:00 PM",
    status: "Confirmed",
  },
];
function Admin() {
  const columns = [
    {
      title: "Member",
      dataIndex: "member",
      render: (v: string) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          {v}
        </Space>
      ),
    },
    { title: "Facility", dataIndex: "facility" },
    { title: "Schedule", dataIndex: "schedule" },
    {
      title: "Status",
      dataIndex: "status",
      render: (v: string) => (
        <Tag color={v === "Confirmed" ? "success" : "gold"}>{v}</Tag>
      ),
    },
    { title: "", render: () => <Button type="link">View</Button> },
  ];
  return (
    <>
      <section className="heading">
        <div>
          <Text className="eyebrow">CLUB OPERATIONS</Text>
          <Title level={2}>Reservation dashboard</Title>
          <Paragraph>Thursday, August 13 · Live facility overview</Paragraph>
        </div>
        <Space>
          <Button icon={<StopOutlined />}>Block schedule</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            New reservation
          </Button>
        </Space>
      </section>
      <div className="stats">
        <Card>
          <Statistic
            title="Today’s reservations"
            value={28}
            prefix={<CalendarOutlined />}
          />
          <Text type="secondary">+12% from last Thursday</Text>
        </Card>
        <Card>
          <Statistic
            title="Active members"
            value={19}
            prefix={<TeamOutlined />}
          />
          <Text type="secondary">Across 4 sports</Text>
        </Card>
        <Card>
          <Statistic
            title="Facility utilization"
            value={72}
            suffix="%"
            prefix={<DashboardOutlined />}
          />
          <Progress percent={72} showInfo={false} />
        </Card>
        <Card>
          <Statistic
            title="Cancellations"
            value={3}
            prefix={<HistoryOutlined />}
          />
          <Text type="secondary">Within normal range</Text>
        </Card>
      </div>
      <div className="admin-grid">
        <Card
          title="Upcoming reservations"
          extra={<Button type="link">View all</Button>}
        >
          <Table
            columns={columns}
            dataSource={rows}
            pagination={false}
            scroll={{ x: 700 }}
          />
        </Card>
        <Card title="Facility load">
          <div className="loads">
            {sports.map((s, i) => {
              const p = [82, 68, 61, 77][i];
              return (
                <div key={s.name}>
                  <Flex justify="space-between">
                    <span>
                      {s.icon} {s.name}
                    </span>
                    <strong>{p}%</strong>
                  </Flex>
                  <Progress
                    percent={p}
                    showInfo={false}
                    strokeColor={s.accent}
                  />
                </div>
              );
            })}
          </div>
          <div className="notice">
            <BellOutlined />
            <span>
              <strong>2 schedule notices</strong>
              <small>Bowling lanes 5–6 close at 6 PM.</small>
            </span>
          </div>
        </Card>
      </div>
      <Card title="Today’s activity" className="activity">
        <Timeline
          items={[
            {
              color: "green",
              children: (
                <>
                  <strong>Reservation confirmed</strong>
                  <p>Member A · Tennis Court 2 · 8:00 AM</p>
                </>
              ),
            },
            {
              color: "blue",
              children: (
                <>
                  <strong>Staff reservation created</strong>
                  <p>Front desk booked Bowling Lane 4</p>
                </>
              ),
            },
            {
              color: "gray",
              children: (
                <>
                  <strong>Schedule block added</strong>
                  <p>Bowling Lanes 5–6 · Maintenance at 6:00 PM</p>
                </>
              ),
            },
          ]}
        />
      </Card>
    </>
  );
}

function Reservations() {
  return (
    <>
      <section className="heading">
        <div>
          <Text className="eyebrow">MY ACTIVITY</Text>
          <Title level={2}>My reservations</Title>
          <Paragraph>Manage your upcoming club activities.</Paragraph>
        </div>
        <Button type="primary" icon={<PlusOutlined />}>
          Book another facility
        </Button>
      </section>
      <div className="my-list">
        {[
          {
            icon: "🎾",
            name: "Tennis · Court 1",
            date: "Saturday, August 15",
            time: "3:00 PM – 4:00 PM",
          },
          {
            icon: "🎳",
            name: "Bowling · Lane 2",
            date: "Tuesday, August 18",
            time: "5:00 PM – 6:00 PM",
          },
        ].map((r) => (
          <Card key={r.name}>
            <b>{r.icon}</b>
            <div>
              <Space>
                <Title level={4}>{r.name}</Title>
                <Tag color="blue">Upcoming</Tag>
              </Space>
              <p>
                <CalendarOutlined /> {r.date} &nbsp; <ClockCircleOutlined />{" "}
                {r.time}
              </p>
              <Text type="secondary">
                <EnvironmentOutlined /> Sports Pavilion, Level 2
              </Text>
            </div>
            <Space>
              <Button>Reschedule</Button>
              <Button danger>Cancel</Button>
            </Space>
          </Card>
        ))}
      </div>
    </>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState("book");
  const [admin, setAdmin] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="loading-shell">
        <div />
        <div><span /><span /><span /></div>
      </div>
    );
  }
  const items = admin
    ? [
        { key: "admin", icon: <DashboardOutlined />, label: "Dashboard" },
        { key: "book", icon: <CalendarOutlined />, label: "Booking board" },
        { key: "facilities", icon: <AppstoreOutlined />, label: "Facilities" },
        { key: "settings", icon: <SettingOutlined />, label: "Settings" },
      ]
    : [
        { key: "book", icon: <CalendarOutlined />, label: "Book a facility" },
        {
          key: "reservations",
          icon: <HistoryOutlined />,
          label: "My reservations",
        },
        {
          key: "notifications",
          icon: <BellOutlined />,
          label: "Notifications",
        },
        { key: "account", icon: <UserOutlined />, label: "My account" },
      ];
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1554a3",
          borderRadius: 10,
          fontFamily: "Inter, Arial, sans-serif",
          colorBgLayout: "#f4f7fb",
        },
        components: {
          Layout: { siderBg: "#0d2d54", headerBg: "#fff" },
          Menu: { darkItemBg: "#0d2d54", darkItemSelectedBg: "#1554a3" },
        },
      }}
    >
      <App>
        <Layout className="shell">
          <Sider width={244} className="sider">
            <div className="brand-wrap">
              <Brand />
            </div>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[view]}
              items={items}
              onClick={({ key }) => setView(key)}
            />
            <div className="mode">
              <span>
                <strong>{admin ? "Staff portal" : "Member portal"}</strong>
                <small>Switch experience</small>
              </span>
              <Switch
                size="small"
                checked={admin}
                onChange={(v) => {
                  setAdmin(v);
                  setView(v ? "admin" : "book");
                }}
              />
            </div>
          </Sider>
          <Layout>
            <Header className="top">
              <Button type="text" icon={<MenuFoldOutlined />} />
              <div className="mobile">
                <Brand />
              </div>
              <Space>
                <Tooltip title="Help">
                  <Button
                    type="text"
                    shape="circle"
                    icon={<QuestionCircleOutlined />}
                  />
                </Tooltip>
                <Badge count={3} size="small">
                  <Button type="text" shape="circle" icon={<BellOutlined />} />
                </Badge>
                <button className="profile">
                  <Avatar icon={<UserOutlined />} />
                  <span>
                    <strong>Demo Member</strong>
                    <small>Member DEMO-0001</small>
                  </span>
                  <DownOutlined />
                </button>
              </Space>
            </Header>
            <Content className="content">
              {view === "admin" ? (
                <Admin />
              ) : view === "reservations" ? (
                <Reservations />
              ) : (
                <Booking />
              )}
            </Content>
          </Layout>
        </Layout>
      </App>
    </ConfigProvider>
  );
}
