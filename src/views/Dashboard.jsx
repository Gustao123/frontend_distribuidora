import { Container, Card } from "react-bootstrap";

const Dashboard = () => {
    return (
        <Container>
            <br />
            <Card style={{ height: 600 }}>
                <iframe
                    title="estadisticas"
                    width="100%"
                    height="100%"
                    src="https://app.powerbi.com/view?r=eyJrIjoiZThlZGI4NDktM2RlMS00YWQyLWJiYWM
                    tODg5MzYzOWE4YTM4IiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiY
                    TEyNyIsImMiOjR9"
                    allowFullScreen="true"
                ></iframe>
            </Card>
        </Container>
    );
};

export default Dashboard;