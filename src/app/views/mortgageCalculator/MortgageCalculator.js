import React from "react";
import { Form, Input, Checkbox, Table } from 'antd';
import Button from '@material-ui/core/Button';
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 20,
  },
};


function calculatePayment (principal, years, rate) {
    var monthlyRate = rate / 100 / 12;
    var monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate), years * 12)));
    var balance = principal;
    var amortization = [];
    for (var y=0; y<years; y++) {
        var interestY = 0;  //Interest payment for year y
        var principalY = 0; //Principal payment for year y
        for (var m=0; m<12; m++) {
            var interestM = balance * monthlyRate;       //Interest payment for month m
            var principalM = monthlyPayment - interestM; //Principal payment for month m
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalM;
        }
        amortization.push({principalY: principalY, interestY: interestY, balance: balance});
    }
    return {monthlyPayment: monthlyPayment, amortization:amortization};
};

function Header(props) {
    return (
        <header>
            <h1 className="text-center">
                {props.title}
            </h1>
        </header>
    );
}

function AmortizationChart(props) {
    var items = props.data.map(function (year, index) {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td className="currency principal">{Math.round(year.principalY).toLocaleString()}</td>
                <td className="stretch">
                    <div className="flex">
                        <div className="bar principal" style={{flex: year.principalY, WebkitFlex: year.principalY}}></div>
                        <div className="bar interest" style={{flex: year.interestY, WebkitFlex: year.interestY}}></div>
                    </div>
                </td>
                <td className="currency interest">{Math.round(year.interestY).toLocaleString()}</td>
                <td className="currency">{Math.round(year.balance).toLocaleString()}</td>
            </tr>
        );
    });
    const columns = [
        {
            title: 'Year',
            dataIndex: 'index',
            key: 'index',
            render: (text,record,index) => (
                <h1>{index+1}</h1>
            )
        },
         {
            title: 'Principal (₦)',
            dataIndex: 'principalY',
            key: 'principalY',
            render: text => (
                <h1>{Math.round(text).toLocaleString()}</h1>
            )
        },
        {
            title: 'Interest (₦)',
            dataIndex: 'interestY',
            key: 'interestY',
            render: text => (
                <h1>{Math.round(text).toLocaleString()}</h1>
            )
        },
        {
            title: 'Balance (₦)',
            dataIndex: 'balance',
            key: 'balance',
            render: text => (
                <h1>{Math.round(text).toLocaleString()}</h1>
            )
        },
    ];
    return (
        <Table dataSource={props.data} columns={columns} bordered/>
    );
}

function MortgageCalculator(props){
    const [ principal, principalSet ] = React.useState(null);
    const [ years, yearsSet ] = React.useState(null);
    const [ rate, rateSet ] = React.useState(17);
    const [ showCalc, showCalcSet ] = React.useState(false);

    function principalChange(event) {
        const { value } = event.target;
        console.log(value);
        principalSet(value);
    }
    function yearsChange(event) {
        const { value } = event.target;
        console.log(value);
        yearsSet(value);
    }
    function rateChange(event) {
        const { value } = event.target;
        console.log(value);
        rateSet(value);
    }
    function onFinish() {
        showCalcSet(true);
    }
    var payment = calculatePayment(principal, years, rate);
    var monthlyPayment = payment.monthlyPayment;
    var amortization = payment.amortization;
    return (
        <div className="content"
            style={{
                padding: '2em'
            }}
        >
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
            >
                <Form.Item 
                    label="Principal (₦)"
                    name="principal"
                    rules={[
                      {
                        required: true,
                        message: 'Please input an amount',
                      },
                    ]}
                >
                    <Input  type="number" value={principal} onChange={principalChange}/>
                </Form.Item>
                <Form.Item 
                    label="Years"
                    name="years"
                    rules={[
                      {
                        required: true,
                        message: 'Please input an amount',
                      },
                    ]}
                >
                    <Input  type="number" value={years} onChange={yearsChange}/>
                </Form.Item>
                <Form.Item 
                    label="Rate (%)"
                    name="rate"
                    rules={[
                      {
                        required: true,
                        message: 'Please input an amount',
                      },
                    ]}
                >
                    <Input  type="number" defaultValue={17} value={rate} onChange={rateChange}/>
                </Form.Item>
                 <Form.Item {...tailLayout}>
                    <Button 
                        variant="contained"
                        color="secondary" 
                        type="submit"
                        style={{
                            float: 'right',
                        }}
                    >
                      Calculate
                    </Button>
                  </Form.Item>
            </Form>
           
            {showCalc && amortization && (
                <div>
                    <h2>Monthly Payment: <span className="currency">{Number(monthlyPayment.toFixed(0)).toLocaleString()}</span></h2>
                <AmortizationChart data={amortization}/>
                </div>
            )}
        </div>
    );
}

function MortgageCalculatorWrapper(props) {
    console.log(props);
    return (
        <div
            style={{
                padding: '4em 2em'
            }}
        >
            <Header title="STOW Mortgage Calculator"/>
            <MortgageCalculator principal="200000" years="3" rate="5"/>
        </div>
    );
}

export default MortgageCalculatorWrapper;
