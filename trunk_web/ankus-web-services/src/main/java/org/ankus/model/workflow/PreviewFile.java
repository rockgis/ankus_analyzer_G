/**
 * This file is part of ankus.
 *
 * ankus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ankus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ankus.  If not, see <http://www.gnu.org/licenses/>.
 */

//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-2 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2013.11.30 at 02:11:34 오후 KST 
//

package org.ankus.model.workflow;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>Java class for anonymous complex type.
 * <p/>
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p/>
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element ref="{http://www.openankus.org/schema/workflow}columnIndex" minOccurs="0"/>
 *         &lt;element ref="{http://www.openankus.org/schema/workflow}rowData" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="override" type="{http://www.w3.org/2001/XMLSchema}boolean" default="true" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "columnIndex",
        "rowData"
})
public class PreviewFile {

    protected List<Integer> columnIndex;
    protected List<String> rowData;

    public List<Integer> getColumnIndex() {
        if (columnIndex == null) {
            columnIndex = new ArrayList<Integer>();
        }
        return this.columnIndex;
    }

    public List<String> getRowData() {
        if (rowData == null) {
            rowData = new ArrayList<String>();
        }
        return this.rowData;
    }

    public void setColumnIndex(List<Integer> count) {
        this.columnIndex = count;
    }

    public void setRowData(List<String> data) {
        this.rowData = data;
    }
}
